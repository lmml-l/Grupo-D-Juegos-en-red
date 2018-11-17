package es.juegosenred.backend.fightforthehood;

import java.util.ArrayList;
import java.util.HashMap;


import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MyMatchController {
	
	private HashMap<String,ArrayList<String>> IpsPartida;
	private int idPartida = 0;
	private String id;
	private String key;
	private String id2;
	private String key2;
	private MyInfo info = new MyInfo(id, key);
	private MyInfo rival = new MyInfo(id2, key2);
	private MyMatch partida = new MyMatch(idPartida, IpsPartida);

	@PostMapping(value="/partida")
	@ResponseStatus(HttpStatus.CREATED)
	public MyMatchController nuevaPartida(@RequestBody MyMatchController match) {
		return match;
	}

	public MyInfo getInfo() {
		return info;
	}

	public void setInfo(MyInfo info) {
		this.info = info;
	}

	public MyInfo getRival() {
		return rival;
	}

	public void setRival(MyInfo rival) {
		this.rival = rival;
	}

	public MyMatch getPartida() {
		return partida;
	}

	public void setPartida(MyMatch partida) {
		this.partida = partida;
	}
}