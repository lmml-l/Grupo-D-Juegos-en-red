package es.juegosenred.backend.fightforthehood;

import java.util.ArrayList;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class getIpRival {
	
	private MyMatch match = new MyMatch();
	private MyInfo rival = new MyInfo();
	
	@GetMapping(value="/partida/ipRival/{id}")
	public ResponseEntity<MyMatch> getIpsThisPartida(@PathVariable String key, @RequestBody MyMatch partidaActualizada) {
		ipRival(match, rival);
		return new ResponseEntity<>(partidaActualizada, HttpStatus.OK);
		//return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
	
	public String ipRival(MyMatch match, MyInfo rival) {
		String ipRival = null;
		ArrayList<String> lista = match.getIpsPartida().get(((Integer)match.getIdPartida()).toString());
		if(lista.get(0).equals(rival.getId())) {
			ipRival=lista.get(1);
		}else if(lista.get(1).equals(rival.getId())){
			ipRival=lista.get(0);
		}
		return ipRival;
	}

	public MyMatch getMatch() {
		return match;
	}

	public void setMatch(MyMatch match) {
		this.match = match;
	}

	public MyInfo getRival() {
		return rival;
	}

	public void setInfo(MyInfo rival) {
		this.rival = rival;
	}
	
}
