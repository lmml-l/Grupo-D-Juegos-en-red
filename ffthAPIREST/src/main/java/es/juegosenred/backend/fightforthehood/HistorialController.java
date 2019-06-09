package es.juegosenred.backend.fightforthehood;

import java.util.ArrayList;
import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HistorialController {
	
	@Autowired
	private MyMatch mymatch;
	
	@PutMapping("/lastmatch")
	@ResponseStatus(HttpStatus.CREATED)
	public String putIp(@RequestBody ArrayList<String> ips){
	String [] apodoss = new String[2] ;
	System.out.println(ips.size());
	System.out.println(ips.get(0));
	System.out.println(ips.get(1));
	apodoss[0] = mymatch.getListadeapodos().get(ips.get(0));
	apodoss[1] = mymatch.getListadeapodos().get(ips.get(1).substring(1,ips.get(1).length()-1));
	mymatch.getHistorial().add(apodoss[0] + " vs " + apodoss[1]);
	ReaderWriter.Escritor(mymatch.getHistorial());
	System.out.println(mymatch.getHistorial().size());
	return (apodoss[0] + "vs" + apodoss[1]);
	}
	
	@GetMapping("/historial")
	@ResponseStatus(HttpStatus.CREATED)
	public Collection<String> getIps(){
		return mymatch.getHistorial();
	}
	
}
