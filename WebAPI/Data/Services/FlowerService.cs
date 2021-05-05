using System.Collections.Generic;
using FlowersShop.Data.Models;
using System.Linq;
using System;
using Microsoft.EntityFrameworkCore;

namespace FlowersShop.Data.Services
{
    public class FlowerService : IFlowersService
    {
        private FlowerContext _flowerCtx;

        public FlowerService (FlowerContext ctx)
        {
            _flowerCtx = ctx;
        }
        public bool AddFlower(Flower flower)
        {
            Flower newFlower = new Flower();
            newFlower.ImageName=flower.ImageName;
            newFlower.UnitPrice=flower.UnitPrice;
            newFlower.Qty=flower.Qty;
            newFlower.Name=flower.Name;
            try {
                _flowerCtx.Flowers.Add(newFlower);
                _flowerCtx.SaveChanges();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return false;
            }
            flower.Id=newFlower.Id;
            return true;
        }

        public int DecrementQty(int id)
        {
            Flower aFlower  = _flowerCtx.Flowers.FirstOrDefault(flower=> flower.Id==id);
            if (aFlower.Qty>0)
            {
                aFlower.Qty -=1;
                _flowerCtx.SaveChanges();
            }
            return aFlower.Qty;
        }

        public bool DeleteFlower(int id)
        {
            try
            {
                Flower flowerDel = _flowerCtx.Flowers.FirstOrDefault(item => item.Id == id);
                if (flowerDel != null)
                {
                    _flowerCtx.Flowers.Remove(flowerDel);
                    _flowerCtx.SaveChanges();
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return false;
            }

            return true;
        }

        public List<Flower> GetAll()
        {
            return _flowerCtx.Flowers.ToList();
        }

        public Flower GetFlower(int id)
        {
            return _flowerCtx.Flowers.FirstOrDefault(item => item.Id == id);
        }

        public int IncrementQty(int id)
        {
            Flower aFlower  = _flowerCtx.Flowers.FirstOrDefault(flower=> flower.Id==id);
            aFlower.Qty +=1;
            _flowerCtx.SaveChanges();
            return aFlower.Qty;
        }

        public int SetQty(int id, int delta)
        {
            Flower aFlower = _flowerCtx.Flowers.FirstOrDefault(Flower=>Flower.Id==id);
            aFlower.Qty +=delta;
            _flowerCtx.SaveChanges();
            return aFlower.Qty;
        }

        public bool UpdateFlower(int id, Flower flower)
        {
            
            try
            {
                if(id == flower.Id)
                {
                    //_flowerCtx.Entry(flower).State=EntityState.Modified;
                    Flower existingFlower = _flowerCtx.Flowers.FirstOrDefault(flower=> flower.Id==id);
                    existingFlower.Name=flower.Name;
                    existingFlower.UnitPrice=flower.UnitPrice;
                    existingFlower.Qty=flower.Qty;
                    existingFlower.ImageName=flower.ImageName;
                    _flowerCtx.SaveChanges();
                }
                else
                    throw new Exception(message:"Bad Request");

            }

            catch(Exception e)
            {
                Console.WriteLine(e.Message);
                return false;
            }

            return true;

        }
    }
}