package es.juegosenred.backend.fightforthehood;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class App 
{
	
	@Bean
	public MyMatch mymatch() {
		return new MyMatch();
	}
	
	
    public static void main( String[] args )
    {
    	SpringApplication.run(App.class, args);
    	Time.init();
    }

}
