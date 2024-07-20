

using Microsoft.VisualBasic;
using Newtonsoft.Json;
using System.Diagnostics.Eventing.Reader;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace ShareGoodVibe.Services
{
    public   class GenderAPISvc
    {
        static HttpClient client = new HttpClient();
        static List<APIResponse> returnValue = new List<APIResponse>();
        public static bool pageReady = false;

        public static async Task<bool> GetGenderInfo(string name)
        {
            HttpResponseMessage response =
                await client.GetAsync("https://api.genderize.io/?name=" + name +
                                      "&apikey=704572ca1b64c0f6ad4b9c1d168769aa");
            var content = response.Content.ReadAsStringAsync();
            var value = content.Result.ToString();

            if (value.Contains("female")) return true;
            else return false;
        }
        public  async Task<List<APIResponse>> GetGenderInfoByList(List<string> names)
        {
            var namesarrary = names.ToArray();

            for (int i = 0; i < 5; i++)
            { 
               List<string> list = new List<string>();
                List<Task> tasksToWait = new List<Task>();

                int index = i * 5;
                list.Add(names.ElementAt(index + 1));
                    list.Add(names.ElementAt(index+2));
                list.Add(names.ElementAt(index + 3));
                list.Add(names.ElementAt(index + 4));
                list.Add(names.ElementAt(index + 5));




                    Task task = new Task(() =>
                    {
                        CreateTask(list);
                    });
                    task.Start();
                    tasksToWait.Add(task);
                   // list.Clear();
               
                if(i== 4)
                {
                    Task.WaitAll(tasksToWait.ToArray());
                    tasksToWait.Clear();
                    pageReady = true;


                }
            }
            return returnValue;
;
        }
        private  async void CreateTask(List<string> name)
        {
            try
            {
                var response = await  GetData(name);
                foreach (var data in response)
                {

                    if (data.gender != null && data.gender.Equals("female"))
                        returnValue.Add(data);
                }           

               
            }
            catch (Exception ex)
            {
               
            }
        }
        private  async Task<List<APIResponse>> GetData(List<string> names)
        {
             List<APIResponse> data = new List<APIResponse>();


            try
            {
                string param = "";
                foreach (string name in names)
                {
                    param = param + "name[]=" + name + "&";
                }
                param = param.Remove(param.Length - 1);
                HttpResponseMessage response =
                    await client.GetAsync("https://api.genderize.io?" + param +
                                          "&apikey=704572ca1b64c0f6ad4b9c1d168769aa");
                var content = await response.Content.ReadAsStringAsync();

                dynamic viewdata = JsonConvert.DeserializeObject<dynamic>(content);
                foreach (var d in viewdata)
                {
                    var value = new APIResponse();
                    value.name = d.name;
                    value.gender = d.gender;
                    data.Add(value);
                }

                //var returnValue = JsonConvert.DeserializeObject<APIResponse>(content);
            }
            catch(Exception ex)
            {

            }
            return data;
        }
        }
}
public class APIResponse
{
    public int count { get; set; }
    public string name { get; set; }
    public string gender { get; set; }
    

}
