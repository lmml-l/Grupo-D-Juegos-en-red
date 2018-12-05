package es.juegosenred.backend.fightforthehood;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Timer;
import java.util.TimerTask;

import org.springframework.stereotype.Component;

public class MyMatch {
	
	private ArrayList<String> IpsPartida ;
	private HashMap<String,String> listadeapodos;
	private ArrayList<String> historial;
	private ArrayList<String> ipconectados;
	private HashMap<String,Integer> tiempoParaDesconexion;
	
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
		IpsPartida = new ArrayList<>();
		listadeapodos = new HashMap<>();
		historial = new ArrayList<>();
		ipconectados = new ArrayList<>();
		tiempoParaDesconexion = new HashMap<>();
	}

	public MyMatch(ArrayList<String> ipsPartida) {
		this.IpsPartida = ipsPartida;
	}


	public ArrayList<String> getIpsPartida() {
		return IpsPartida;
	}

	public void setIpsPartida(ArrayList<String> ipsPartida) {
		IpsPartida = ipsPartida;
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
				IpsPartida.remove(key);
				keysBorradas.add(key);
			}
		}
		
		for(String key: keysBorradas) {
		tiempoParaDesconexion.remove(key);
		}
	}
	
	
}
