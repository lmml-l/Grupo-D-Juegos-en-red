package es.juegosenred.backend.fightforthehood;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MyInfoController {

	@Autowired
	private MyMatch mymatch = new MyMatch();

	/*
	@PutMapping("/myinfo/{ip}")
	@ResponseStatus(HttpStatus.CREATED)
	public MyInfo putMyInfo(@RequestBody MyInfo myinfo, @PathVariable String ip) {
		mymatch.getListadeapodos().put(myinfo.getIp(), myinfo.getApodo());
		// Nuevo Junio
		ArrayList<String> ParApodoContrasena = new ArrayList<>();
		ParApodoContrasena.add(myinfo.getApodo());
		ParApodoContrasena.add(myinfo.getContrasena());
		mymatch.getListaConParApodoContrasena().add(ParApodoContrasena);
		///
		// System.out.println(myinfo.getContrasena());
		// System.out.println(myinfo.getIp());
		// System.out.println(mymatch.getListadeapodos().get(myinfo.getIp()));

		return myinfo;
	}
	*/
	
	// Nuevo Junio (Cambiar Mappings)

	// Faltaria hacer comprobacion de usuarios activos y ya logueados
	@PutMapping("/login/{name}")
	@ResponseStatus(HttpStatus.CREATED)
	public String Login(@RequestBody MyInfo myinfo, @PathVariable String name) {
		//System.out.println("Estoy ejecutando el login en el servidor");
		String codigoDeError ="";
		for (List<String> parapodocontrasena : (mymatch.getListaConParApodoContrasena())) {
			if (parapodocontrasena.get(0).equals(myinfo.getApodo())) {// Se comprueba la posicion 0 que es el Nombre
				if (parapodocontrasena.get(1).equals(myinfo.getContrasena())) {
					//Informacion de Login correcta
					//Ahora comprobamos disponibilidad de la sala
					if(mymatch.getNombresenPartida().size()<2) {
						//Comprobamos que esta cuenta no este en uso
						System.out.println(" Wii");
						for(String apodoEnSala: mymatch.getNombresenPartida()) {
							System.out.println(apodoEnSala + " Wii");
							if(apodoEnSala.equals(myinfo.getApodo())) {
								codigoDeError = "UsuarioYaLogueado";
							}
						}
						if((codigoDeError!="UsuarioYaLogueado")) {
							mymatch.getNombresenPartida().add(myinfo.getApodo());//Añadimos al jugador a la sala
							return "OK";//Hay hueco aun en la sala
						}
					}
					else {
						if(!codigoDeError.equals("UsuarioYaLogueado")) {
							System.out.println(codigoDeError);
							codigoDeError = "NoHueco";//No hay hueco en la sala
							System.out.println("NoHueco");
						}
					}
				} else {
					if((!codigoDeError.equals("NoHueco")) && !(codigoDeError.equals("UsuarioYaLogueado"))) {
						System.out.println(codigoDeError);
						codigoDeError = "ContrasenaInvalida";// Contrasena incorrecta
						System.out.println("ContrasenaInvalida");
					}
				}
			} else {
				if(!(codigoDeError.equals("NoHueco")) && !(codigoDeError.equals("ContrasenaInvalida")) && !(codigoDeError.equals("UsuarioYaLogueado"))) {
					System.out.println(codigoDeError);
					codigoDeError = "ApodoInvalido";// Apodo incorrecta
					System.out.println("ApodoInvalido");
				}
				
			}
		}
		
		return codigoDeError;
	}

	@PutMapping("/signup/{name}")
	@ResponseStatus(HttpStatus.CREATED)
	public boolean SignUp(@RequestBody MyInfo myinfo, @PathVariable String name) {
		boolean isSignUpAlready = false;
		// Comprueba si ya esta registrado el nombre
		for (List<String> parapodocontrasena : (mymatch.getListaConParApodoContrasena())) {
			if (parapodocontrasena.get(0).equals(myinfo.getApodo())) {
				isSignUpAlready = true;
			}

		}

		if (!isSignUpAlready) {
			ArrayList<String> ParApodoContrasena = new ArrayList<>();
			ParApodoContrasena.add(myinfo.getApodo());
			ParApodoContrasena.add(myinfo.getContrasena());
			mymatch.getListaConParApodoContrasena().add(ParApodoContrasena);
		}
		return isSignUpAlready;

	}
}
