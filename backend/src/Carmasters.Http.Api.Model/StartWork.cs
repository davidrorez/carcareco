using System;
using System.Text.Json;
using System.Text.Json.Nodes;

namespace Carmasters.Http.Api.Models
{
    public record SendPricingDto(string EmailAddress, string DisplayName);
    public record PutActivityDto(string Notes, bool IsVehicelLinesOnPricing);
    public class PutProductOrService
    {
        public Guid Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public decimal? Quantity { get; set; }
        public string Unit { get; set; }
        public decimal Price { get; set; }
        public short? Discount { get; set; }
    }
    public record PostOrPutWork(string ClientName, string ClientPhone, string Description, string VehicleInfo, string VehiclePlate, Guid[] AssignedTo, int? Odo, bool StartWithOffer);


    public record WorkPage(
        Guid id,
        string WorkNr,
        DateTime StartedOn,
        DateTime? SentOn,
        string Status,
        string Issued,
        string ClientName,
        string ClientPhone,
        string VehicleInfo, 
        string VehiclePlate,
        string RegNr, 
        string MechanicNames, 
        string Notes,  
        bool hasRepairs,
        int numberOfOffers,
        JsonNode OfferIssuance, 
        JsonNode Issuance) 
    {
        public WorkPage() : this(default, default, default, default,default,default,default,default,default,default,default,default,default,default,default,default,default) { }
    }

}