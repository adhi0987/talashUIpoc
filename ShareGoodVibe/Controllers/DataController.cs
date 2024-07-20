using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Hosting;
using Newtonsoft.Json;
using System.Data.SqlClient;
using System.Data;
using IHostingEnvironment = Microsoft.AspNetCore.Hosting.IHostingEnvironment;

namespace ShareGoodVibe.Controllers
{

    [ApiController]
    [Route("[controller]")]
    
    public class DataController : ControllerBase
    {
        static List<VdeoData> lst = new List<VdeoData>();
        private IHostingEnvironment _hostingEnvironment;
        static List<string> deleteList = new List<string>();

        public DataController(IHostingEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }
        private static string[] Summaries = new[]
           {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };





        /// <summary>
        /// =========================================================================================================
        /// 
        /// </summary> SAVE FAVOURITES TO DB
        /// 
        /// <param name="input"></param>
        //Delete data from files. Updaet deleted content and Batch job clear content from files. 
        //Menu : click from file info on Delete.
        //============================================================================================================

        [HttpGet("[action]")]
        public void Updateclicks(string input)
        {
            // deleteList.Add(input);
            var lastUpdate = DateTime.Now;
            //Add data to DB
            // SqlConnection cn = new SqlConnection("Data Source=EAN-LT-224\\SQLEXPRESS;initial catalog=UserClicks ; User ID=dasaradh;Password=sa123;Integrated Security=SSPI;");
            //SqlConnection cn = new SqlConnection("Data Source=40.126.235.144;initial catalog=EnAct UAT BE ; User ID=eauser;Password=Hazn7pHAgYYm5l5;Integrated Security=false;");

            //SqlCommand cmd = new SqlCommand("INSERT INTO dbo.UserClcksActiveSessions (" + " Userid, link, lastupdate " + ") VALUES (" + " 1, @link, @lastupdate" + ")", cn);

            //cmd.Parameters.Add("@link", SqlDbType.VarChar, 50).Value = input;
            //cmd.Parameters.Add("@LastUpdate", SqlDbType.DateTime).Value = DateTime.Now;


            //cn.Open();
            //cmd.ExecuteNonQuery();
            //cn.Close();

            //input += "here";
            return;
        }



        /// <summary>
        /// =========================================================================================================
        /// </summary> GET FAVOURITES DATA
        /// <param name="input"></param>
        /// <returns></returns>
        ///==========================================================================================================
        /// 
        [HttpGet("[action]")]

        public IEnumerable<UserData> GetFavourites(string userid)
        {
            List<string> imageList = new List<string>();
            List<UserData> lst = new List<UserData>();
            // deleteList.Add(input);
            var lastUpdate = DateTime.Now;
            //Add data to DB
            //  SqlConnection cn = new SqlConnection("Data Source=EAN-LT-224\\SQLEXPRESS;initial catalog=UserClicks ; User ID=dasaradh;Password=sa123;Integrated Security=alseSSPI;");
            //SqlConnection cn = new SqlConnection("Data Source=40.126.235.144;initial catalog=EnAct UAT BE ; User ID=eauser;Password=Hazn7pHAgYYm5l5;;Integrated Security=false;");

            //SqlCommand cmd = new SqlCommand("SELECT top 60  * FROM UserClcksActiveSessions order by lastupdate desc ", cn);
            //cn.Open();
            //cmd.Parameters.Add("@USERID", SqlDbType.VarChar, 50).Value = userid;
            //using (SqlDataReader reader = cmd.ExecuteReader())
            //{
            //    while (reader.Read())
            //    {
            //        var s = (string)reader["link"];
            //        imageList.Add(s);                    
            //    }
            //}
            int totalImages = imageList.Count;
            for (int i = 0; i < imageList.Count; i++)
            {
                UserData obj = new UserData();
                obj.info1 = imageList.ElementAt(i); i++;
                if (i < totalImages) obj.name = imageList.ElementAt(i ); i++;
                if (i < totalImages) obj.age = imageList.ElementAt(i ); i++;
                if (i < totalImages) obj.occupation = imageList.ElementAt(i ); i++;
                if (i < totalImages) obj.species = imageList.ElementAt(i ); i++;
                if (i < totalImages) obj.info1 = imageList.ElementAt(i ); i++;
                if (i < totalImages) obj.info2 = imageList.ElementAt(i ); i++;
                lst.Add(obj);
            }

            //cn.Close();
            return lst ;
        }





        /// <summary>
        /// =========================================================================================================
        /// </summary> GET VIDEO DATA 
        /// <param name="input"></param>
        /// <returns></returns>
        /// =========================================================================================================
        /// 
        //Get Video  Data  load data from youtube. 
        //Menu : get video data from youtube.

        [HttpGet("[action]")]
        public ActionResult GetVideolist(string input)
        {
            lst.Clear();
            string lineOfText1 = "";
            input = "angular_videos";
            string folderName = "Upload";

            string webRootPath = _hostingEnvironment.WebRootPath;
            string newPath = Path.Combine(webRootPath, folderName);

            // var filestream = new System.IO.FileStream("./app_data/" + input + ".txt",
            var filestream = new System.IO.FileStream(newPath + "/" + input + ".txt",

                                         // var filestream = new System.IO.FileStream("./app_data/" + input + ".txt",
                                         System.IO.FileMode.Open,
                                         System.IO.FileAccess.Read,
                                         System.IO.FileShare.ReadWrite);


            System.IO.BufferedStream bs = new System.IO.BufferedStream(filestream);

            var file = new System.IO.StreamReader(bs, System.Text.Encoding.UTF8, true, 128);

            while ((lineOfText1 = file.ReadLine()) != null)
            {
                try
                {
                    //VdeoData obj = new VdeoData();
                    //obj.name = Youtube.Youtube.GetVideoId(lineOfText1);
                    //if (obj.name.Length > 4 && !lst.Select(x => x.name).ToList().Contains(obj.name))
                    //    lst.Add(obj);

                    //// Example(lineOfText1);
                    //if (lst.Count > 200) break;
                } //return Json(lst.Take(5));
                catch (Exception ex)
                {
                }
            }
            var list = JsonConvert.SerializeObject(lst, Formatting.None,
           new JsonSerializerSettings()
           {
               ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
           });

            return Content(list, "application/json");
        }

        //Get Random data from list. 
        //List send back to view. 

        private List<E> ShuffleList<E>(List<E> inputList)
        {
            List<E> randomList = new List<E>();

            Random r = new Random();
            int randomIndex = 0;
            while (inputList.Count > 0)
            {
                randomIndex = r.Next(0, inputList.Count); //Choose a random object in the list
                randomList.Add(inputList[randomIndex]); //add it to the new, random list
                inputList.RemoveAt(randomIndex); //remove to avoid duplicates
            }

            return randomList; //return the new random list
        }

        /// <summary>
        ///===========================================================================================================
        /// </summary> GET IMAGE DATA 
        /// <param name="input"></param>
        /// <returns></returns>
        /// ===========================================================================================================
        /// 

        [HttpGet("[action]")]
        public IEnumerable<UserData> GetUserData(string input)
        {
            string lineOfText1 = "";
            string lineOfText2 = "";
            try { 
            var filestream = new System.IO.FileStream("./wwwroot/upload/"+input+".txt",//C:\Project\gallary\backup\gallary version 1\Gallary2\Gallary\wwwroot\Upload\rise.txt
                                          System.IO.FileMode.Open,
                                          System.IO.FileAccess.Read,
                                          System.IO.FileShare.ReadWrite);

            
            System.IO.BufferedStream bs = new System.IO.BufferedStream(filestream);

                var file = new System.IO.StreamReader(bs, System.Text.Encoding.UTF8, true, 128);
            List<UserData> lst =new List<UserData>();
            while ((lineOfText1 = file.ReadLine()) != null)
            {
                    try
                    {
                        UserData obj = new UserData();
                        lineOfText2 = file.ReadLine();
                        Boolean found;
                        //Do something with the lineOfText(
                        if (lineOfText2 ==null || !lineOfText2.Contains("profile") )
                            continue;
                        else
                        {
                            obj.name = lineOfText1.Replace("FileName", "");
                            obj.name = obj.name.Replace("Filename", "");
                            obj.name = obj.name.Replace("filename", "");                        
                            obj.name = obj.name.Replace(" ", "");
                            obj.name = obj.name.Replace(":", "");
                            var s  = obj.name.Split("_");
                            obj.name = s[0];
                            if(!obj.name.Contains("https://www.facebook.com/"))
                            obj.name = "https://www.facebook.com/" +obj.name;
                            else
                                obj.name = obj.name;


                            string output = lineOfText2.Split(':', ',')[1];
                            obj.age = output.Replace("\"", "");
                            obj.age = "https://graph.facebook.com/" + obj.age + "/picture?type=large#/1039660954";

                            var lineOfText3 = file.ReadLine();
                            if (lineOfText3 != null)
                            {
                                obj.occupation = lineOfText3.Replace("FileName", "");
                                obj.occupation = obj.occupation.Replace("Filename", "");
                                obj.occupation = obj.occupation.Replace("filename", "");
                                obj.occupation = obj.occupation.Replace(" ", "");
                                obj.occupation = obj.occupation.Replace(":", "");
                                var s1 = obj.occupation.Split("_");
                                obj.occupation = s1[0];

                               
                                obj.occupation = "https://www.facebook.com/" + obj.occupation;
                            }
                            var lineOfText4 = file.ReadLine();
                            if (lineOfText4 != null)
                            {
                                string output1 = lineOfText4.Split(':', ',')[1];
                                obj.species = output1.Replace("\"", "");
                                obj.species = "https://graph.facebook.com/" + obj.species + "/picture?type=large#/1039660954";
                            }

                            var lineOfText5 = file.ReadLine();
                            if (lineOfText5 != null)
                            {
                                obj.info1 = lineOfText5.Replace("FileName:", "");
                                obj.info1 = obj.info1.Replace("Filename", "");
                                obj.info1 = obj.info1.Replace("filename", "");
                                obj.info1 = obj.info1.Replace(" ", "");
                                obj.info1 = obj.info1.Replace(":", "");
                                var s2 = obj.info1.Split("_");
                                obj.info1 = s2[0];
                                obj.info1 = "https://www.facebook.com/" +obj.info1;
                            }
                            var lineOfText6 = file.ReadLine();
                            if (lineOfText6 != null)
                            {
                                string output2 = lineOfText6.Split(':', ',')[1];
                                obj.info2 = output2.Replace("\"", "");
                                obj.info2 = "https://graph.facebook.com/" + obj.info2 + "/picture?type=large#/1039660954";
                            }




                            //obj.species = obj.species.Replace("entity_id\":\"","");
                            lst.Add(obj);
                        }
                    }
                    catch(Exception ex)
                    {
                        continue;
                    }
            }
            var rng = new Random();
            // lst =ShuffleList(lst);

            List<UserData> FINALDATA = new List<UserData>();
            Random r = new Random();
            for(int i =0; i< 499;i++)
            {
                FINALDATA.Insert(i, lst[r.Next(0, lst.Count)]);
            }
            // return lst.Take(1000);
            return FINALDATA.Take(200);
            }
            catch (Exception ex)
            {
                return null;
            }
            //return Enumerable.Range(1, 5).Select(index => new UserData
            //{
            //    name=  "http://facebook.com/e.melism",
            //     age= "http://graph.facebook.com/100001538625944/picture?type=normal#/100001538625944",
            //     species= "http://graph.facebook.com/1039660954/picture?type=large#/1039660954",
            //     occupation= "http://graph.facebook.com/1830700925/picture?type=normal#/1830700925"
            //});
        }

        /// <summary>
        /// 
        /// ==========================================================================================================
        /// </summary>  DEMO CONTROLLER METHOD 
        /// <param name="input"></param>
        /// <returns></returns>
        ///===========================================================================================================
        /// 
        /// 

        //Good example action to get weather data. 
        [HttpGet("[action]")]
        public IEnumerable<WeatherForecast> WeatherForecasts()
        {
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                DateFormatted = DateTime.Now.AddDays(index).ToString("d"),
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            });
        }
        /// <summary>
        /// ==========================================================================================================
        /// </summary> GENERIC DATA RETRIVALS
        /// <param name="input"></param>
        /// <returns></returns>
        /// ==========================================================================================================
        /// 

        //Following functions Not being used. 
        [HttpGet("[action]")]
        public IEnumerable<UserData> GetData(string input, string start, string end)
        {
            input = "giffiles";
            string lineOfText1 = "";
            string folderName = "Upload";
            string webRootPath = _hostingEnvironment.WebRootPath;
            string newPath = Path.Combine(webRootPath, folderName);

            // var filestream = new System.IO.FileStream("./app_data/" + input + ".txt",
            var filestream = new System.IO.FileStream(newPath + input + ".txt",
                                          System.IO.FileMode.Open,
                                          System.IO.FileAccess.Read,
                                          System.IO.FileShare.ReadWrite);
            System.IO.BufferedStream bs = new System.IO.BufferedStream(filestream);

            var file = new System.IO.StreamReader(bs, System.Text.Encoding.UTF8, true, 128);
            List<UserData> lst = new List<UserData>();
            while ((lineOfText1 = file.ReadLine()) != null)
            {
                try
                {
                    UserData obj = new UserData();
                    obj.name = betweenStrings(lineOfText1, "1  ", "\"");
                    lineOfText1 = file.ReadLine();
                    obj.species = betweenStrings(lineOfText1, "1  ", "\"");
                    lineOfText1 = file.ReadLine();
                    obj.info1 = betweenStrings(lineOfText1, "1  ", "\"");
                    lineOfText1 = file.ReadLine();
                    obj.info2 = betweenStrings(lineOfText1, "1  ", "\"");
                    lst.Add(obj);
                }
                catch (Exception ex)
                {

                }



            }
            return lst.Take(28);
        }
        public static String betweenStrings(String text, String start, String end)
        {
            try
            {


                int p1 = text.IndexOf(start) + start.Length;
                int p2 = text.IndexOf(end, p1);

                if (end == "") return (text.Substring(p1));
                else return text.Substring(p1, p2 - p1);
            }
            catch (Exception ex)
            {
                return "";
            }
        }       
        
        
        static async void Example(string line)
        {
            //// This method runs asynchronously.
            // VdeoData obj = new VdeoData();
            //string t = await Task.Run(() => Youtube.Youtube.GetVideoId(line));
            //obj.name = t;
            //if (t!=null && t.Length > 4 && !lst.Select(x => x.name).ToList().Contains(obj.name))
            //    lst.Add(obj);
            
        }
        
        // GET api/values
        [HttpGet]
        public ActionResult<IEnumerable<string>> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public ActionResult<string> Get(int id)
        {
            return $"value{id}";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
    public class WeatherForecast
    {
        public string DateFormatted { get; set; }
        public int TemperatureC { get; set; }
        public string Summary { get; set; }

        public int TemperatureF
        {
            get
            {
                return 32 + (int)(TemperatureC / 0.5556);
            }
        }
    }
    public class VdeoData
    {
        public string name { get; set; }
    }

    public class UserData
    {
        public string name { get; set; }
        public string occupation { get; set; }
        public string age { get; set; }
        public string species { get; set; }
       

        public string info1 { get; set; }
        public string info2 { get; set; }


    }
}
