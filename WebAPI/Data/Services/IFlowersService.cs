using System.Collections.Generic;
using System.Threading.Tasks;
using FlowersShop.Data.Models;

namespace FlowersShop.Data.Services
{
    public interface IFlowersService
    {
        List<Flower> GetAll();
        Flower GetFlower (int id);
        bool UpdateFlower(int id, Flower flower);
        bool DeleteFlower (int id);
        bool AddFlower(Flower flower);
        int IncrementQty (int id);
        int DecrementQty (int id);
        int SetQty(int id, int delta);
    }
}