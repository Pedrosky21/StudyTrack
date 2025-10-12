import { Unit } from "../domain/Unit.entity";
import unitRepository from "../infraestructure/Unit.repository";

class UnitServices {
  async createUnit(unit: Unit) {
    return await unitRepository.createUnit(unit);
  }

  async editUnit(unitData: Unit) {
    return await unitRepository.editUnit(unitData);
  }

  async deleteUnit(unitID: number) {
    return await unitRepository.deleteUnit(unitID);
  }
}

export default new UnitServices();
