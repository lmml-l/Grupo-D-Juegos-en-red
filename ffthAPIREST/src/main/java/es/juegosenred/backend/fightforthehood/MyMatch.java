package es.juegosenred.backend.fightforthehood;

import java.util.ArrayList;
import java.util.HashMap;

public class MyMatch {
	
	private ArrayList<String> IpsPartida ;
	private HashMap<String,String> listadeapodos;
	
	public MyMatch() {
		IpsPartida = new ArrayList<>();
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
