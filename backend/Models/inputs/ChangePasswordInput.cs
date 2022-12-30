namespace backend.Models.inputs
{
    public class ChangePasswordInput
    {
        public int Id { get; set; }
        public string CurrentPassword { get; set; }
        public string NewPassword { get; set; }
    }
}
