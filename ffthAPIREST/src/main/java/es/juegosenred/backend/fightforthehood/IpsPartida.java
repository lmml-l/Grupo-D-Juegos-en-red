package es.juegosenred.backend.fightforthehood;

import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class IpsPartida {
	 
	@Autowired
	 private MyMatch mymatch;
	
	
	
	@GetMapping
	public ResponseEntity<ArrayList<String>> getIps(){
		return new ResponseEntity<>(mymatch.getIpsPartida(), HttpStatus.OK);
	}
	
	@GetMapping
	public ResponseEntity<String> getRivalIp(HttpServletRequest request){ 
		String myip = request.getRemoteAddr();
		ArrayList<String> ips = mymatch.getIpsPartida();
		if(ips.size()==2) {
			if(ips.get(0).equals(myip)){
				return new ResponseEntity<>(ips.get(1), HttpStatus.OK);
			}else {
				return new ResponseEntity<>(ips.get(0), HttpStatus.OK);
			}
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
	@GetMapping
	public ResponseEntity<String> getMyIp(HttpServletRequest request){
		return new ResponseEntity<>(request.getRemoteAddr(), HttpStatus.OK);
	}
	
	/*
	@PostMapping 
	public ResponseEntity<String> postIP(@RequestBody String ip){
		
		return new ResponseEntity<String>(ip,HttpStatus.OK);}
	*/
}