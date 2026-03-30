using System;

namespace Carmasters.Core.Domain.Utils
{
    public static class TimeZoneHelper
    {
        private static readonly TimeZoneInfo CrZone =
            TimeZoneInfo.FindSystemTimeZoneById("America/Costa_Rica");

        public static DateTime ToUtc(DateTime date)
        {
            var unspecified = DateTime.SpecifyKind(date, DateTimeKind.Unspecified);
            return TimeZoneInfo.ConvertTimeToUtc(unspecified, CrZone);
        }
    }
}