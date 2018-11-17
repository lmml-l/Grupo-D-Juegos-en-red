package es.juegosenred.backend.fightforthehood;

import java.util.ArrayList;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AddPlayerToMatch {
	
	private MyMatch match = new MyMatch();
	private MyInfo info = new MyInfo();
	
	@PutMapping(value="/partida/id/{id}")
	public ResponseEntity<MyMatch> añadirJugador(@PathVariable String id, @RequestBody MyMatch partidaActualizada) {
		AddPlayertoMatch(match, info);
		return new ResponseEntity<>(partidaActualizada, HttpStatus.OK);
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
	
	public String AddPlayertoMatch(MyMatch match, MyInfo info) {
		String key = ((Integer)match.getIdPartida()).toString();
		if(match.getIpsPartida().containsKey(key)) {
			ArrayList<String> lista = match.getIpsPartida().get(key);
			if(lista.size()== 1) {
				lista.add(info.getId());
				match.getIpsPartida().put(key, lista);
			}
		}
		else {
			ArrayList<String> lista = new ArrayList<String>();
			lista.add(info.getId());
			match.getIpsPartida().put(key, lista);
		}
		return info.getId();
		
	}

	public MyMatch getMatch() {
		return match;
	}

	public void setMatch(MyMatch match) {
		this.match = match;
	}

	public MyInfo getInfo() {
		return info;
	}

	public void setInfo(MyInfo info) {
		this.info = info;
	}
	
	
}
