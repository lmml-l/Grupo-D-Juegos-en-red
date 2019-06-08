package es.juegosenred.backend.fightforthehood;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

import es.juegosenred.backend.fightforthehood.nuevoJunio.UsuariosRegistradosReaderWriter;

//APLICACIÓN
//Inicialización del backend

@SpringBootApplication
@EnableWebSocket
public class App implements WebSocketConfigurer
{
	private static MyMatch mymatchf;
	
	@Bean
	public MyMatch mymatch() {
		return new MyMatch();
	}
	
	@Autowired
	private MyMatch mymatch;
	
	@PostConstruct
	public void init () {
		App.mymatchf = mymatch;
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
    	UsuariosRegistradosReaderWriter.Lector(mymatchf.getListaConParApodoContrasena());
    }

}
