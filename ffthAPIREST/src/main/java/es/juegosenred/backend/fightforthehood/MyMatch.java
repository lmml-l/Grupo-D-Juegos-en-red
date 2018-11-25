package es.juegosenred.backend.fightforthehood;

import java.util.ArrayList;
import java.util.HashMap;

public class MyMatch {
	
	private ArrayList<String> IpsPartida ;
	private HashMap<String,String> listadeapodos;
	private ArrayList<String> historial;
	
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
	
	
}
