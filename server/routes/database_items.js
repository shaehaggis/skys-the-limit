const express = require('express');
const router = express.Router();
const pool = require('../db/database');

router.get('/items', async (req, res) => {
    //get all menu items and their ingredients
    const queryAllItems = `SELECT menu_items.*, 
                        (CASE WHEN COUNT(item_ingredients.item_id) = 0 THEN NULL ELSE 
                        ARRAY_AGG(jsonb_build_object('id', ingredients.id, 'ingredient_name', ingredients.ingredient_name, 'ingredient_price', ingredients.ingredient_price)) END ) AS ingredients
                        FROM menu_items
                        LEFT JOIN item_ingredients
                        ON menu_items.id = item_ingredients.item_id
                        LEFT JOIN ingredients
                        ON item_ingredients.ingredient_id = ingredients.id
                        GROUP BY menu_items.id
                        ORDER BY menu_items.id;`

    const queryAllIngredients = `SELECT * FROM ingredients;`
    const queryMostPopular = `SELECT DISTINCT ON (menu_items.type) menu_items.*, 
                            (CASE WHEN COUNT(item_ingredients.item_id) = 0 THEN NULL ELSE ARRAY_AGG(DISTINCT jsonb_build_object('ingredient_name', ingredients.ingredient_name, 'ingredient_price', ingredients.ingredient_price)) END) AS ingredients
                            FROM menu_items
                            INNER JOIN item_sales
                            ON menu_items.id = item_sales.item_id
                            LEFT JOIN item_ingredients
                            ON menu_items.id = item_ingredients.item_id
                            LEFT JOIN ingredients
                            ON item_ingredients.ingredient_id = ingredients.id
                            GROUP BY menu_items.id, menu_items.type
                            ORDER BY menu_items.type, COUNT(item_sales.item_id) DESC LIMIT 2;`;

    let result = []; 

    try {
        const items = await pool.query(queryAllItems);
        result.push({ items: items.rows});
        const ingredients = await pool.query(queryAllIngredients);
        result.push({ ingredients: ingredients.rows});
        const mostPopular = await pool.query(queryMostPopular);
        result.push({ mostPopular: mostPopular.rows});
    }
    catch (err) {
        console.error(err);
        res.send(err);
    }

    res.send(result);
});

module.exports = router;