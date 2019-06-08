package es.juegosenred.backend.fightforthehood.nuevoJunio;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

//LECTOR Y ESCRITOR DEL NOMBRE Y CONTRASEÑA DE LOS USUSARIOS REGISTRADOS
public class UsuariosRegistradosReaderWriter {

	  public void resetArchive(File file){
          file.delete();
          file = new File("UsuariosRegistrados.txt");
      }
	  
	  public static void Lector(List<List<String>> usuariosMyMatch){
          String line;
          try{
              FileReader fr = new FileReader("UsuariosRegistrados.txt");
              BufferedReader br = new BufferedReader(fr);
              line = br.readLine();
              if(line!=null) {
            	  String [] a = line.split(" ");
                  List<String> parUsuarioContrasena = new ArrayList<String>();
                  parUsuarioContrasena.add(a[0]);
                  parUsuarioContrasena.add(a[1]);
                  usuariosMyMatch.add(parUsuarioContrasena);
              }
              while (line != null){
            	  String [] b = line.split(" ");
                  List<String> parUsuarioContrasenab = new ArrayList<String>();
                  parUsuarioContrasenab.add(b[0]);
                  parUsuarioContrasenab.add(b[1]);
                  usuariosMyMatch.add(parUsuarioContrasenab);
                  line = br.readLine();
              }
              br.close();
          }catch (IOException e){
              e.printStackTrace();
          } 
      }
	  
	  public static void Escritor(List<List<String>> usuariosRegistrados){
          File file = new File("UsuariosRegistrados.txt");
          FileWriter fw;
    
          try{
              fw = new FileWriter(file);
              //pw = new PrintWriter(fw);
              Iterator<List<String>> iterator = usuariosRegistrados.iterator();
              while(iterator.hasNext()) {
            	  List<String> parApodoContraseña = iterator.next();
            	  fw.write(parApodoContraseña.get(0) + " " + parApodoContraseña.get(1)  + "\n");
              }
              fw.close();
          }
          catch (Exception e)
          {
              e.printStackTrace();
          }
      }
}
