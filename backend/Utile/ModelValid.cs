using System.Reflection;

namespace backend.Utile
{
    public class ModelValid
    {
        public static bool IsModelValid<T>(T model)
        {
            foreach (PropertyInfo property in model.GetType().GetProperties())
            {
                if (property.PropertyType == typeof(string))
                {
                    string value = (string)property.GetValue(model);
                    if (string.IsNullOrEmpty(value))
                    {
                        return false;
                    }
                }
            }

            return true;
        }
    }
}
