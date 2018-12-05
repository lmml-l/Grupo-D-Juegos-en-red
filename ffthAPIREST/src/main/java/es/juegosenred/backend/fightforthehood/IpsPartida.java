package es.juegosenred.backend.fightforthehood;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Timer;
import java.util.TimerTask;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
		System.out.println(mymatch.getIpsPartida().toString()+ "lista de ipslobby");
		return mymatch.getIpsPartida();
		
	}
	

	@GetMapping("/idlistconectadas")
	@ResponseStatus(HttpStatus.CREATED)
	public Collection<String> getIpsConectadas(){
		return mymatch.getIpconectados();
	}
	
	@PutMapping("/id")
	@ResponseStatus(HttpStatus.CREATED)
	public String putIp(@RequestBody String ip){
		if(mymatch.getIpsPartida().size()<2) {
			mymatch.getIpsPartida().add(ip);
		}
		return ip;
	}
	
	@PutMapping("/ipconectados")
	@ResponseStatus(HttpStatus.CREATED)
	public String putIpConectada(@RequestBody String ip){
		if(!mymatch.getIpconectados().contains(ip)) {
			mymatch.getIpconectados().add(ip);
		}	
		return ip;
	}
	
	@PutMapping("/ipconectadosclear")
	@ResponseStatus(HttpStatus.CREATED)
	public String clearIpConectada(){
			mymatch.getIpconectados().clear();
		return null;
	}
	
	@PutMapping("/deleteid")
	@ResponseStatus(HttpStatus.CREATED)
	public String deleteId (@RequestBody String ip){
		//System.out.println("ipquedebeborrar0 " + mymatch.getIpsPartida().get(0));
		//System.out.println("ipquedebeborrar "+ ip.substring(2, ip.length()-3)+ '"');
		mymatch.getIpsPartida().remove(ip.substring(2, ip.length()-3)+ '"');
		return ip;
	}
	
	
	/*
	@GetMapping("/idrival")
	@ResponseStatus(HttpStatus.CREATED)
	public String getRivalIp(HttpServletRequest request){ 
		String myip = request.getRemoteAddr();
		ArrayList<String> ips = mymatch.getIpsPartida();
		if(ips.size()==2) {
			if(ips.get(0).equals(myip)){
				return (ips.get(1));
			}else {
				return (ips.get(0));
			}
		}
		return null;
	}
	*/
	
	
	@GetMapping("/ip/myip")
	@ResponseStatus(HttpStatus.CREATED)
	public String getMyIp(HttpServletRequest request){
		return request.getRemoteAddr();
	}
	
	@PutMapping("/time/{ip:.+}")
	@ResponseStatus(HttpStatus.CREATED)
	public String putTime(@PathVariable String ip , @RequestBody String id){
		mymatch.getTiempoParaDesconexion().put(id,0);
		System.out.println(id);
		return ip;
	}
	
	public void loopfordesconexion() {
		 mymatch.AumentarTiempo(1); 
		 mymatch.EliminarIpenIpsPartidaporTime(2);      
	}
}
