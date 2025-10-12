import { Unit } from "../domain/Unit.entity";
import UnitModel from "./Unit.model";

class UnitRepository {
    async createUnit(unit:Unit) {
        return await UnitModel.create({
            title: unit.title,
            order: unit.order,
            description: unit.description,
            subject_id: unit.subject_id
        })
    }

    async editUnit(unitData:Unit) {
        return await UnitModel.update(unitData, {
            where: {id: unitData.id}
        })
    }

    async deleteUnit(unitID:number) {
        return await UnitModel.destroy({
            where: {id: unitID}
        })
    }
}

export default new UnitRepository();
