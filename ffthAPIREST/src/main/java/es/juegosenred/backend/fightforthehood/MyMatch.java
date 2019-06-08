package es.juegosenred.backend.fightforthehood;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.*;

//INFORMACIÓN DE LA PARTIDA (COMBATE)
public class MyMatch {
	
	private ArrayList<String> nombresenPartida ;
	private HashMap<String,String> listadeapodos;
	private ArrayList<String> ipconectados;
	private HashMap<String,Integer> tiempoParaDesconexion;
	private String checker;
	//Nuevas variables
	private List<List<String>> ListaConParApodoContrasena;
	
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

	public MyMatch() {
		nombresenPartida = new ArrayList<>();
		listadeapodos 	 = new HashMap<>();
		ipconectados 	 = new ArrayList<>();
		tiempoParaDesconexion = new HashMap<>();
		checker = "1";
		//Nuevas variables
		ListaConParApodoContrasena = new ArrayList<>();	//identificación del jugador (nombre/contraseña)
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