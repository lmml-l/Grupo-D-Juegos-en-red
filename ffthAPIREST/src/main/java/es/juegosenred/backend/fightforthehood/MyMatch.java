package es.juegosenred.backend.fightforthehood;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Timer;
import java.util.TimerTask;
import java.util.*;

import org.springframework.stereotype.Component;

public class MyMatch {
	
	private ArrayList<String> nombresenPartida ;
	private HashMap<String,String> listadeapodos;
	private ArrayList<String> historial;
	private ArrayList<String> ipconectados;
	private HashMap<String,Integer> tiempoParaDesconexion;
	private String checker;
	//Nuevas variables
	private List<List<String>> ListaConParApodoContrasena;
	private ArrayList<String> ApododeUsuariosenLobby;//Sus funcion se realiza en nombresenPartida;
	
	public HashMap<String, Integer> getTiempoParaDesconexion() {
		return tiempoParaDesconexion;
	}

	public void setTiempoParaDesconexion(HashMap<String, Integer> tiempoParaDesconexion) {
		this.tiempoParaDesconexion = tiempoParaDesconexion;
	}

	public ArrayList<String> getIpconectados() {
		return ipconectados;
	}

	public void setIpconectados(ArrayList<String> ipconectados) {
		this.ipconectados = ipconectados;
	}

	public ArrayList<String> getHistorial() {
		return historial;
	}

	public void setHistorial(ArrayList<String> historial) {
		this.historial = historial;
	}

	public MyMatch() {
		nombresenPartida = new ArrayList<>();
		listadeapodos = new HashMap<>();
		historial = new ArrayList<>();
		ipconectados = new ArrayList<>();
		tiempoParaDesconexion = new HashMap<>();
		checker = "1";
		//Nuevas variables
		ListaConParApodoContrasena = new ArrayList<>();
	
		
	}

	public List<List<String>> getListaConParApodoContrasena() {
		return ListaConParApodoContrasena;
	}

	public void setListaConParApodoContrasena(List<List<String>> listaConParApodoContrasena) {
		ListaConParApodoContrasena = listaConParApodoContrasena;
	}

	public MyMatch(ArrayList<String> ipsPartida) {
		this.nombresenPartida = ipsPartida;
	}


	public ArrayList<String> getNombresenPartida() {
		return nombresenPartida;
	}

	public void setNombresenPartida(ArrayList<String> ipsPartida) {
		nombresenPartida = ipsPartida;
	}

	public HashMap<String,String> getListadeapodos() {
		return listadeapodos;
	}

	public void setListadeapodos(HashMap<String,String> listadeapodos) {
		this.listadeapodos = listadeapodos;
	}
	
	public void AumentarTiempo(int tiemposumado) {		
		for(String key : tiempoParaDesconexion.keySet()) {
			tiempoParaDesconexion.put(key,tiempoParaDesconexion.get(key)+tiemposumado);
			//System.out.println(key);
			//System.out.println(tiempoParaDesconexion.get(key)+"t");
		}
		
	}
	
	public void EliminarIpenIpsPartidaporTime(int maxtime) {
		ArrayList<String> keysBorradas = new ArrayList<>();
		for(String key : tiempoParaDesconexion.keySet()) {
			int time = tiempoParaDesconexion.get(key);
			if(time >= maxtime ) {
				nombresenPartida.remove(key);
				keysBorradas.add(key);
			}
		}
		
		for(String key: keysBorradas) {
		tiempoParaDesconexion.remove(key);
		}
	}

	public String getChecker() {
		return checker;
	}

	public void setChecker(String checker) {
		this.checker = checker;
	}
	
	
}
