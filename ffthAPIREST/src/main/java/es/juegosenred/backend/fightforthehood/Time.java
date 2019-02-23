package es.juegosenred.backend.fightforthehood;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Timer;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class Time {
	
	
	private static MyMatch mymatch;
	
	@Autowired
	public Time(MyMatch match) {
	Time.mymatch = match;
	}
	
	private static ScheduledExecutorService connectionController = Executors.newSingleThreadScheduledExecutor();
	
	private static boolean serverOn = false;
	
	private static int timeStep = 1000;
	
	public static void init() {
		
		if(serverOn) {
			System.out.println("Servidor ya inicializado.");
			return;
		}
		
		serverOn = true;
		
		connectionController.scheduleWithFixedDelay(()->{
			
			mymatch.AumentarTiempo(1);
			mymatch.EliminarIpenIpsPartidaporTime(10);
			
		}, timeStep,timeStep, TimeUnit.MILLISECONDS);
		
	}
}
