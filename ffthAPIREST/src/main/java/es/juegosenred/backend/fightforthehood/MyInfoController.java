package es.juegosenred.backend.fightforthehood;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

//CONTROLADOR DE LA INFORMACIÓN DEL USUARIO

@RestController
public class MyInfoController {

	@Autowired
	private MyMatch mymatch = new MyMatch();

	// Nuevo Junio
	@PutMapping("/login/{name}")
	@ResponseStatus(HttpStatus.CREATED)
	public String Login(@RequestBody MyInfo myinfo, @PathVariable String name) {
		String codigoDeError ="";
		for (List<String> parapodocontrasena : (mymatch.getListaConParApodoContrasena())) {
			if (parapodocontrasena.get(0).equals(myinfo.getApodo())) {// Se comprueba la posicion 0 que es el Nombre
				if (parapodocontrasena.get(1).equals(myinfo.getContrasena())) {
					//Informacion de Login correcta
					//Ahora comprobamos disponibilidad de la sala
					if(mymatch.getNombresenPartida().size()<2) {
						//Comprobamos que esta cuenta no esté en uso
						for(String apodoEnSala: mymatch.getNombresenPartida()) {
							System.out.println(apodoEnSala + " Wii");
							if(apodoEnSala.equals(myinfo.getApodo())) {
								codigoDeError = "UsuarioYaLogueado";
							}
						}
						if((codigoDeError!="UsuarioYaLogueado")) {
							//Hay hueco en la sala
							mymatch.getNombresenPartida().add(myinfo.getApodo());//Añadimos el jugador a la sala
							return "OK";
						}
					}
					else {
						if(!codigoDeError.equals("UsuarioYaLogueado")) {
							//No hay hueco en la sala
							System.out.println(codigoDeError);
							codigoDeError = "NoHueco";
							System.out.println("NoHueco");
						}
					}
				} else {
					if((!codigoDeError.equals("NoHueco")) && !(codigoDeError.equals("UsuarioYaLogueado"))) {
						//Contraseña incorrecta
						System.out.println(codigoDeError);
						codigoDeError = "ContrasenaInvalida";
						System.out.println("ContrasenaInvalida");
					}
				}
			} else {
				if(!(codigoDeError.equals("NoHueco")) && !(codigoDeError.equals("ContrasenaInvalida")) && !(codigoDeError.equals("UsuarioYaLogueado"))) {
					//Apodo incorrecto
					System.out.println(codigoDeError);
					codigoDeError = "ApodoInvalido";		
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
			es.juegosenred.backend.fightforthehood.nuevoJunio.UsuariosRegistradosReaderWriter.Escritor(mymatch.getListaConParApodoContrasena());
		}
		return isSignUpAlready;
	}
}