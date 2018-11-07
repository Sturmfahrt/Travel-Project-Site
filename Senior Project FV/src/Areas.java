import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import java.io.IOException;

public class Areas {
	public static void infos(String location) throws IOException {
		Document info = Jsoup.connect("https://www.bestplaces.net/city/florida/"+location).get();
	}
	
	public static void best(String loc) throws IOException {
		Document yelp = Jsoup.connect("https://www.yelp.com/search?find_desc=Things+To+Do&find_loc="+loc+"%2C+FL+32145").get();
	}

	public static void food(String loca) throws IOException {
		Document tasty = Jsoup.connect("https://www.yelp.com/search?find_desc=Restaurants&find_loc="+loca+"%2C%20FL%2032145").get();
	}
}

