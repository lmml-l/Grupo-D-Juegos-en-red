package es.juegosenred.backend.fightforthehood;

import java.util.ArrayList;
import java.util.HashMap;

public class MyMatch {
	
	private int idPartida = 0;
	private HashMap<String,ArrayList<String>> IpsPartida ;
	
	public MyMatch() {
		
	}

	public MyMatch(int idPartida, HashMap<String, ArrayList<String>> ipsPartida) {
		this.idPartida = idPartida;
		this.IpsPartida = ipsPartida;
	}

	public int getIdPartida() {
		return idPartida;
	}

	public void setIdPartida(int idPartida) {
		this.idPartida = idPartida;
	}

	public HashMap<String, ArrayList<String>> getIpsPartida() {
		return IpsPartida;
	}

	public void setIpsPartida(HashMap<String, ArrayList<String>> ipsPartida) {
		IpsPartida = ipsPartida;
	}
	
	
}
