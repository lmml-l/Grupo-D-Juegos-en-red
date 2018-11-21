package es.juegosenred.backend.fightforthehood;

//faltan los imports

public class ReaderWriter {

	String[] apodosindex = new String[10];
            

        public String[] init(String[] apodosindex){
        	for(int i=0; i<10; i++){
        		apodosindex[i]==null;
        	}
        	return apodosindex;
        }    

        public String[] Lector()
        {
            string line;
            string text = "";
            char spacer = ',';
            try
            {
                //Ubicación del fichero
                StreamReader sr = new StreamReader("./Assets/Scripts/Q_TableFactory/QTable.txt");

                line = sr.ReadLine();
                line = sr.ReadLine();
                
                while (line != null)
                {
                    
                    System.Console.WriteLine(line);

                    text+=(line);

                    line = sr.ReadLine();
                }

                
                sr.Close();
                System.Console.ReadLine();

            }catch (FileNotFoundException e){
                System.Console.WriteLine("Exception: " + e.Message);

            }finally{
                System.Console.WriteLine("||---------------||");
            }

            string[] tablevalues = text.Split(spacer);

            
            int posarray = 0;
               for(int s = 0; s < Q_tableMatrix.GetLength(0); s++)
                {
                    for(int j = 0; j < Q_tableMatrix.GetLength(1); j++)
                    {
                        Q_tableMatrix[s, j] = float.Parse(tablevalues[posarray]);
                        posarray++;
                    }
                }
            
            return Q_tableMatrix;
        }

        public void Escritor(String[] apodosindex, MyInfo my info)
        {
          
            try
            {
               	File file = new File("./Grupo-D-Juegos-en-red/apodosindex.txt");
                FileWriter fw = new FileWriter(file, true);
                PrintWriter pw = new PrintWriter(fw);

                for (int i = 0; i < 10; i++) {
                    if(apodosindex[i]==null){
                    	apodosindex[i]= myinfo.getApodo();
                    	pw.println(myinfo.getApodo());
                    }else if(apodosindex[9]!=null){
                    	for(int i = 1; i < 9; i++){
                    		apodosindex[i]=apodosindex[i+1];
                    	}
                    	apodosindex[9]=myinfo.getApodo();
                    	file.delete();
                    	file = new File("./Grupo-D-Juegos-en-red/apodosindex.txt");
                    	/*fw = new FileWriter(file, true);
                    	pw = new PrintWriter(fw);*/

                    	for(int i = 0; i < 10; i++){
                    		pw.println(apodosindex[i]);
                    	} 
                    }
                }
                 
            }
            catch (Exception e)
            {
                e.printStackTrace();

            }
            finally
            {
               try {
           
		           if (null != fw)
		              fw.close();
		       }catch (Exception e2) {
		              e2.printStackTrace();
		       }

            }
        }
	
}