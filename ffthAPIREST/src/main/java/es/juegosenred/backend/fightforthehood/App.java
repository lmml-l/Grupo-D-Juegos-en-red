package es.juegosenred.backend.fightforthehood;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@SpringBootApplication
@EnableWebSocket
public class App implements WebSocketConfigurer
{
	
	@Bean
	public MyMatch mymatch() {
		return new MyMatch();
	}
	
	@Override
	public void registerWebSocketHandlers(
	WebSocketHandlerRegistry registry) {
	registry.addHandler(echoHandler(), "/echo")
	.setAllowedOrigins("*");
	}
	@Bean
	public WebsocketEchoHandler echoHandler() {
	return new WebsocketEchoHandler();
	}

	
	
    public static void main( String[] args )
    {
    	SpringApplication.run(App.class, args);
    	Time.init();
    }

}
