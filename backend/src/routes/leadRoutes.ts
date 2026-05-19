import express from "express"
import protect from "../middleware/authMiddleware"
import authorizeRoles from "../middleware/roleMiddleware"
import { createLead, deleteLead, exportLeadsCSV, getLeads, getSingleLead, updateLead } from "../controllers/leadController";

const router = express.Router();

router.get("/",protect,getLeads);
router.get("/:id",protect,getSingleLead);
router.post("/",protect,createLead);
router.put("/:id",protect,updateLead);
router.delete("/:id",protect,authorizeRoles("admin"),deleteLead);
router.get(
  "/export/csv",
  protect,
  authorizeRoles("admin"),
  exportLeadsCSV
);
export default router;