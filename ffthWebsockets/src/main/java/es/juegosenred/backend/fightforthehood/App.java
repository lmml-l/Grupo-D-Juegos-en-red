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
	
	registry.addHandler(dropHandler(), "/drops")
	.setAllowedOrigins("*");
	
	registry.addHandler(timeHandler(), "/tiempo")
	.setAllowedOrigins("*");
	registry.addHandler(puntuacionHandler(), "/puntuacion")
	.setAllowedOrigins("*");
	}
	@Bean
	public WebsocketEchoHandler echoHandler() {
	return new WebsocketEchoHandler();
	}
	@Bean
	public WebsocketDropHandler dropHandler() {
	return new WebsocketDropHandler();
	}
	@Bean
	public WebsocketTimeHandler timeHandler() {
	return new WebsocketTimeHandler();
	}
	@Bean
	public WebsocketPuntuacionHandler puntuacionHandler() {
	return new WebsocketPuntuacionHandler();
	}
	
	
    public static void main( String[] args )
    {
    	SpringApplication.run(App.class, args);
    	Time.init();
    }

}
