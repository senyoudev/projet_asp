namespace backend.Models.inputs
{
    public class UserUpdateInput
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }
        public string nom { get; set; }
        public string prenom { get; set; }
        public string Photo { get; set; }
        public string role { get; set; }

    }
}
