namespace TaekwonTourney.Contracts.Responses
{
    public class ApiResponse<T>
    {
        public ApiResponse() { }

        public ApiResponse(T response)
        {
            Data = response;
        }
        
        public T Data { get; set; }
    }
}