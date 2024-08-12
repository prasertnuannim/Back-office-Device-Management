import sqlite3 from "sqlite3";
import express from "express";

const db = new sqlite3.Database("./database.sqlite");

export const add = async (req: express.Request, res: express.Response) => {
    try {
        const { name, status,temperature, speed } = req.body;
        db.run(
            "INSERT INTO iot_devices (name, status, temperature, speed) VALUES (?, ?, ?, ?)",
            [name, status, temperature, speed],
            function (err) {
                if (err) {
                    return res.status(500).json({ error: "Error inserting device" });
                }
                return res.status(200).json({ message: "Device created successfully" });
            }
        );
    } catch (error) {
        return res.status(400).json({ error: "Error adding device" });
    }
}

export const list = async (req: express.Request, res: express.Response) => {
    try {
        db.all("SELECT * FROM iot_devices ", async (err: any, rows: any) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return false;
            } else {
                res.status(200).json(rows);
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ error: "Error list device" });
    }
} 

export const update = async (req: express.Request, res: express.Response) => {
    try {
        const { name, status, temperature, speed } = req.body;
        db.all(
            "UPDATE iot_devices SET name = ?, status = ?, temperature = ?, speed =? WHERE id = ?",
            [name, status, temperature, speed, req.params.id],
            function (err) {
                if (err) {
                    return res.status(500).json({ error: "Error updating device" });
                }
                return res.status(200).json({ message: "Device updated successfully" });
            }
        );
    } catch (error) {
        return res.status(400).json({ error: "Error updating device" });
    }
}

export const remove = async (req: express.Request, res: express.Response) => {
    try {
        db.run(
            "DELETE FROM iot_devices WHERE id = ?",
            [req.params.id],
            function (err) {
                if (err) {
                    return res.status(500).json({ error: "Error deleting device" });
                }
                return res.status(200).json({ message: "Device deleted successfully" });
            }
        );
    } catch (error) {
        return res.status(400).json({ error: "Error deleting device" });
    }
}