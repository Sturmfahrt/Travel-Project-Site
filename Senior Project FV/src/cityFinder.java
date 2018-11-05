import java.io.IOException;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;

public class cityFinder {
	public static void cities(int l) throws IOException { //this will get all the city names and put them into an array
		try {
			
			Document docum = Jsoup.connect("https://weather.com/weather/tenday/l/Davie+FL+USFL"+String.format("%04d", l)+":1:US").get();
			String citi = docum.title();
			String[] citiName = citi.split(",");
			String cities = citiName[0];
			System.out.println(cities + ": "+String.format("%04d", l));
			
		} catch (org.jsoup.HttpStatusException e) {
			l++;
			System.out.println("THERE WAS A GAP HERE!");
		}

	}
	
	public static String getCity(int l) throws IOException{ //returns the name of the city
		String retard = "";
		try {
			
		Document docum = Jsoup.connect("https://weather.com/weather/tenday/l/Davie+FL+USFL"+String.format("%04d", l)+":1:US").get();
		String citi = docum.title();
		String[] citiName = citi.split(",");
		retard = citiName[0];
		} catch (org.jsoup.HttpStatusException e) {
			l++;
			System.out.println("City not found");
		}
		return retard;
	}
}
