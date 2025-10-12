import { Request, Response } from "express";
import unitServices from "../application/Unit.services";
import { Unit } from "../domain/Unit.entity";

class UnitController {
  async createUnit(req: Request, res: Response) {
    try {
      const unit: Unit = req.body;

      const unitCreated = await unitServices.createUnit(unit);

      res.status(201).json(unitCreated);
    } catch (error) {
      console.log(error);
    }
  }

  async editUnit(req: Request, res: Response) {
    try {
      const unit: Unit = req.body;

      const unitUpdated = await unitServices.editUnit(unit);

      res.status(200).json(unitUpdated);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteUnit(req: Request, res: Response) {
    try {
        const unitID = req.params.id;

        await unitServices.deleteUnit(Number(unitID));

        res.status(200).json({message: `La unidad de id ${unitID} se elimino.`})
    } catch (error) {
      console.log(error);
    }
  }
}

export default new UnitController();
