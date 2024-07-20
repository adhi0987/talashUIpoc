
using Microsoft.AspNetCore.Mvc;


using ShareGoodVibe.Services;

namespace ShareGoodVibe.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<WeatherForecast> Get()
        {
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
             
            })
            .ToArray();
        }
        [HttpGet("[action]")]
        public  async Task<IEnumerable<UserData>> GetUserDataAsync(string input)
        {
            string lineOfText1 = "";
            string lineOfText2 = "";
            try
            {
                var filestream = new System.IO.FileStream("./App_Data/" + input + ".txt",//C:\Project\gallary\backup\gallary version 1\Gallary2\Gallary\wwwroot\Upload\rise.txt
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
                        lineOfText2 = file.ReadLine();
                        Boolean found;
                        //Do something with the lineOfText(
                        if (lineOfText2 == null )
                            continue;
                        else
                        {
                            obj.name = lineOfText1.Replace("FileName", "");
                            obj.name = obj.name.Replace("Filename", "");
                            obj.name = obj.name.Replace("filename", "");
                            obj.name = obj.name.Replace(" ", "");
                            obj.name = obj.name.Replace(":", "");
                            obj.name = obj.name.Replace(".html", "");
                            obj.name = obj.name.Replace("FieName", "");


                            var s = obj.name.Split("_");
                            obj.name = s[0];
                            if (!obj.name.Contains("https://www.facebook.com/"))
                                obj.name = "https://www.facebook.com/" + obj.name;
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
                                obj.occupation = obj.occupation.Replace("www.facebook.com", "");
                                obj.occupation = obj.occupation.Replace("html", "");


                                obj.occupation = obj.occupation.Replace(" ", "");
                                obj.occupation = obj.occupation.Replace(":", "");
                                var s1 = obj.occupation.Split("_");
                                obj.occupation = s1[0];

                          
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
                                obj.info1 = obj.info1.Replace("www.facebook.com", "");

                                obj.info1 = obj.info1.Replace(":", "");
                                var s2 = obj.info1.Split("_");
                                obj.info1 = s2[0];
                                obj.info1 = "https://www.facebook.com/" + obj.info1;
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
                    catch (Exception ex)
                    {
                        continue;
                    }
                }
                var rng = new Random();
                // lst =ShuffleList(lst);

                List<UserData> FINALDATA = new List<UserData>();
                List<UserData> FilteredFinalData = new List<UserData>();
                Random r = new Random();
                for (int i = 0; i < 500; i++)
                {
                    FINALDATA.Insert(i, lst[r.Next(0, lst.Count)]);
                }
                var names = FINALDATA.Where(x=>x.name.Length < 25 ).Select(x => x.name).ToList();
                var param = new List<string>();
                var Srv = new GenderAPISvc();
                foreach( string name in FINALDATA.Select(x=>x.name))
                {
                    var newname = name.Replace("https://www.facebook.com/", "");
                    if (newname.Length < 20 && !newname.Contains("html") && !newname.Contains("entity")
                        && !newname.Contains("profile"))
                    {
                        var firstname = newname.Split(".");
                        param.Add(firstname[0]);
                   
                    
                    }
                    if (param.Count  == 50)
                    {
                        try
                        {
                            List<APIResponse> aPIResponses = await Srv.GetGenderInfoByList(param);

                            if (aPIResponses.Count > 0)
                            {
                                 foreach (var name22 in aPIResponses)
                                {
                                    var data = FINALDATA.Where(X => X.name.Contains(name22.name)).Select(x => x).FirstOrDefault();
                                    if (data != null)
                                        FilteredFinalData.Add(data);
                                }
                            }
                            break;
                                                   
                        }
                        catch (Exception ex)
                        {
                        }



                    };
                }
                // return lst.Take(1000);
                while (!GenderAPISvc.pageReady)
                {
                        Thread.Sleep(10000);
                }
                return FilteredFinalData;
                // return FilteredFinalData;
            }
            catch (Exception ex)
            {
                return null;
            }
           
        }

    }
}
