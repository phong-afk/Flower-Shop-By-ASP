using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using FlowersShop.Data.Models;
using FlowersShop.Data.Services;
using Microsoft.AspNetCore.Http;
using System.IO;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FlowerController : ControllerBase
    {
        private IFlowersService _flowerService;
        

        public FlowerController( IFlowersService flowersService)
        {
            _flowerService = flowersService;
        }


        [HttpGet("[action]")]
        
        public ActionResult<List<Flower>> GetAll ()
        {
          return _flowerService.GetAll();
        }


        [HttpGet("[action]/{id}")]
        public ActionResult<Flower> GetById (int id)
        {
            return _flowerService.GetFlower(id);
        }


        [HttpPost("[action]")]
        public ActionResult<bool> AddFlower(string name, string imageName, int qty, float productPrice)
        {
            //Console.WriteLine(String.Concat(name, imageName, qty, productPrice));
            Flower newFlower = new Flower();
            newFlower.Name=name;
            newFlower.UnitPrice=productPrice;
            newFlower.ImageName=imageName;
            newFlower.Qty=qty;

            if (_flowerService.AddFlower(newFlower))
                return CreatedAtAction(nameof(GetById), new {id=newFlower.Id}, newFlower);
            else 
            {
                return BadRequest("False was returned from flowerService object!");
            }

        }


        [HttpPut("[action]/{id}")]
        public ActionResult<bool> UpdateFlower (int id, string name, string imageName, int qty, float productPrice)
        {
            Flower aFlower=new Flower();
            aFlower.Name=name;
            aFlower.ImageName=imageName;
            aFlower.Qty=qty;
            aFlower.UnitPrice=productPrice;
            aFlower.Id=id;
            if (_flowerService.UpdateFlower(id, aFlower))
                return NoContent();
            else
                return BadRequest();
        }


        [HttpDelete("[action]/{id}")]
        public ActionResult<bool> DeleteFlower (int id)
        {
            if (_flowerService.DeleteFlower(id))
                return NoContent();
            else
                return NotFound();
        }


        [HttpPost("[action]")]
        public ActionResult SaveFile (IFormFile uFile)
        {
            string fileName = Guid.NewGuid().ToString();
            string fileExt = uFile.FileName.Substring(uFile.FileName.LastIndexOf("."));
            string filePath=Directory.GetCurrentDirectory();
            //Console.WriteLine(filePath+"\\StaticFiles\\"+fileName+fileExt,FileMode.Create);
            try
            {
                uFile.CopyTo(target: new FileStream(filePath+"\\StaticFiles\\"+fileName+fileExt,FileMode.Create));
                return Ok(value: fileName + fileExt);
            }
            catch
            (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpDelete("[action]/{fileName}")]
        public ActionResult DeleteFile (String fileName)
        {
            string filePath=Directory.GetCurrentDirectory();
            try {
                System.IO.File.Delete(filePath+"\\StaticFiles\\"+fileName);
                return NoContent();
            }
            catch (Exception)
            {
                return NotFound();
            }
        }
        [HttpPut("[action]/{id}")]
        public ActionResult IncQty (int id)
        {
            return Ok(_flowerService.IncrementQty(id));
        }
        [HttpPut("[action]/{id}")]
        public ActionResult DecQty (int id)
        {
            return Ok(_flowerService.DecrementQty(id));
        }
        [HttpPut("[action]/{id}")]
        public ActionResult SetQty (int id, int deltaQty)
        {
            return Ok(_flowerService.SetQty(id, deltaQty));
        }
    }
}
