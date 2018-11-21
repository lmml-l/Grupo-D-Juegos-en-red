package es.juegosenred.backend.fightforthehood;

import java.util.ArrayList;
import java.util.Collection;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/ips")
public class IpsPartida {
	
	@Autowired
	private MyMatch mymatch;
	
	
	@GetMapping("/idlist")
	@ResponseStatus(HttpStatus.CREATED)
	public Collection<String> getIps(){
		return mymatch.getIpsPartida();
	}
	
	
	@GetMapping("/idrival")
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
	
	@GetMapping("/idmy")
	public ResponseEntity<String> getMyIp(HttpServletRequest request){
		return new ResponseEntity<>(request.getRemoteAddr(), HttpStatus.OK);
	}
	
}
