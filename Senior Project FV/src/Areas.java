import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;

import java.io.IOException;

public class Areas {
	public void infos() throws IOException {
		Document info = Jsoup.connect("https://www.bestplaces.net/city/florida/zephyrhills").get();
	}
	
	public void best() throws IOException {
		Document yelp = Jsoup.connect("https://www.yelp.com/search?find_desc=Things+To+Do&find_loc=zephyrhills%2C+FL+32145").get();
	}

}

