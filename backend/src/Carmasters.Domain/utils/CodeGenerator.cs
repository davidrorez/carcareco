using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Carmasters.Core.Domain.utils
{
    public static class CodeGenerator
    {
        public static string Generate(string name)
        {
            var prefix = string.IsNullOrWhiteSpace(name)
                ? "PRD"
                : new string(name
                    .Where(char.IsLetter)
                    .Take(3)
                    .ToArray())
                    .ToUpper();

            if (prefix.Length < 3)
                prefix = prefix.PadRight(3, 'X');

            var timestamp = DateTime.UtcNow.Ticks.ToString().Substring(10);

            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            var random = Random.Shared;
            var randomPart = new string(Enumerable.Repeat(chars, 3)
                .Select(s => s[random.Next(s.Length)]).ToArray());

            return $"{prefix}-{timestamp}-{randomPart}";
        }
    }
}
