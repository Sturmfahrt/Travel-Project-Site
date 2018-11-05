
import java.io.IOException;

public abstract class Test {

	public static void main(String[] args) throws IOException {

		//forecast.weather(); 
		findNWrite();
	}
	
	
	public static void findNWrite() throws IOException {
		for(int l = 1; l != 1202; l++) {
		
			cityFinder.cities(l);
		
			if(cityFinder.getCity(l) == "") {
			
			} else {
				writer.write(cityFinder.getCity(l)+" "+String.format("%04d", l));
			}
		}
	}
	
	
}
	
