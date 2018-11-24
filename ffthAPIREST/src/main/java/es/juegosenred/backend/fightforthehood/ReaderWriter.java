package es.juegosenred.backend.fightforthehood;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;


public class ReaderWriter {

    String [] apodosindex = new String[5];

    public ReaderWriter(String [] apodos){
        apodosindex = apodos;
    }   

        public void resetArchive(File file){
            file.delete();
            file = new File("apodosindex.txt");
        }

        public String[] Lector(String[] apodosindex){
            String line;
            String [] apodosarchive = new String[5];
            int i = 0;
            try{

                FileReader fr = new FileReader("apodosindex.txt");
                BufferedReader br = new BufferedReader(fr);

                line = br.readLine();
                apodosarchive[i] = line;
                while (line != null){
                    
                    System.out.println(line);
                    apodosarchive[i] = line;
                    line = br.readLine();
                }

                
                br.close();


            }catch (IOException e){
                e.printStackTrace();
            }

            apodosindex = apodosarchive;
            return apodosindex;
        }

        public String[] Escritor(String[] apodosindex, MyInfo myinfo, MyInfo rival){
          
            File file = new File("apodosindex.txt");
            FileWriter fw;
            PrintWriter pw;
            String thismatchinfo = myinfo.getApodo() + "-" + rival.getApodo();
            
            try{
                
                fw = new FileWriter(file);
                pw = new PrintWriter(fw);
                for (int i = 0; i < 5; i++) {
                    if(apodosindex[i]==null){
                        apodosindex[i]= thismatchinfo;
                        pw.println(thismatchinfo);
                    }else if(apodosindex[4]!=null){
                        for(int j = 1; j < 4; j++){
                            apodosindex[j]=apodosindex[j+1];
                        }
                        apodosindex[4]=thismatchinfo;
                        resetArchive(file);

                        for(int k = 0; k < 5; k++){
                            pw.println(apodosindex[k]);
                        } 
                    }
                }
                 pw.close();
            }
            catch (Exception e)
            {
                e.printStackTrace();

            }
            
            return apodosindex;
            /*finally
            {
               try {
           
                   if (null != fw)
                      fw.close();
               }catch (Exception e2) {
                      e2.printStackTrace();
               }

            }*/
        }
    
}