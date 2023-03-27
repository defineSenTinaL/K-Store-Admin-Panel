import React from "react";
import { DownOutlined } from "@ant-design/icons";
import { Badge, Dropdown, Space, Table } from "antd";
import { Link } from "react-router-dom";
import "./CategoryList.css";

const category_data = [
	{ id: "10", name: "Home Improvement tools" },
	{ id: "20", name: "Home Decor" },
	{ id: "30", name: "Home & Kitchen Appliences" },
	{ id: "40", name: "TV,Audio & Video Players" },
	{ id: "50", name: "Gaming" },
	{ id: "1011", parent_id: "10", name: "Power Tools" },
	{ id: "1012", parent_id: "10", name: "Bathroom fittin/sanitory" },
	{ id: "1013", parent_id: "10", name: "Hardware & Electricals" },
	{ id: "101112", parent_id: "1011", name: "Blower" },
	{ id: "101113", parent_id: "1011", name: "Angle Grinder" },
	{ id: "101114", parent_id: "1011", name: "Angle Drill" },
	{ id: "101115", parent_id: "1011", name: "Glue Gun" },
	{ id: "101116", parent_id: "1011", name: "Hammer Drills" },
	{ id: "101117", parent_id: "1011", name: "Heat Gun" },
	{ id: "101118", parent_id: "1011", name: "Nailers" },
	{ id: "101119", parent_id: "1011", name: "Power Drills" },
	{ id: "101120", parent_id: "1011", name: "Power Hand Tools Kits" },
	{ id: "101121", parent_id: "1011", name: "Rotary Tool" },
	{ id: "101122", parent_id: "1011", name: "Screw Gun" },
	{ id: "101123", parent_id: "1011", name: "Soldering Iron" },
	{ id: "101124", parent_id: "1011", name: "Welding Machine" },
	{ id: "101125", parent_id: "1011", name: "Tile Cutter" },
	{ id: "101213", parent_id: "1012", name: "Bath Tub" },
	{ id: "101214", parent_id: "1012", name: "Commode" },
	{ id: "101215", parent_id: "1012", name: "Flush" },
	{ id: "101216", parent_id: "1012", name: "Showers" },
	{ id: "101217", parent_id: "1012", name: "Toilet Paper Holder" },
	{ id: "101218", parent_id: "1012", name: "Wash Basin" },
	{ id: "101219", parent_id: "1012", name: "Tap" },
	{ id: "101314", parent_id: "1013", name: "Adhesive" },
	{ id: "101315", parent_id: "1013", name: "Wires" },
	{ id: "101316", parent_id: "1013", name: "MCB & RCCB" },
	{ id: "101317", parent_id: "1013", name: "Switch & Sockets" },
	{ id: "101318", parent_id: "1013", name: "Door Bell" },
	{ id: "101319", parent_id: "1013", name: "Wiring Tap" },
	{ id: "101320", parent_id: "1013", name: "Sand Paper" },
	{ id: "101321", parent_id: "1013", name: "Fan Regulator" },
	{ id: "101322", parent_id: "1013", name: "Legrand/Schneider Accesories" },
	{ id: "2021", parent_id: "20", name: "Lights & Lamps" },
	{ id: "202122", parent_id: "2021", name: "Bulb" },
	{ id: "202123", parent_id: "2021", name: "Ceiling Lamp/Concealed Light" },
	{ id: "202124", parent_id: "2021", name: "Tube Light/Led Batten" },
	{ id: "202125", parent_id: "2021", name: "Wall Lamps" },
	{ id: "3031", parent_id: "30", name: "Large Home Appliances" },
	{ id: "3032", parent_id: "30", name: "Kitchen Appliances" },
	{ id: "3033", parent_id: "30", name: "Home Appliances" },
	{ id: "303132", parent_id: "3031", name: "Air Conditioners" },
	{ id: "303133", parent_id: "3031", name: "Microwave" },
	{ id: "303134", parent_id: "3031", name: "Refrigerator" },
	{ id: "303135", parent_id: "3031", name: "Television" },
	{ id: "303136", parent_id: "3031", name: "Washing Machine" },
	{ id: "303233", parent_id: "3032", name: "Mixer Grinder / Juicers" },
	{ id: "303234", parent_id: "3032", name: "Electric Cooker" },
	{ id: "303235", parent_id: "3032", name: "Sandwich Maker" },
	{ id: "303236", parent_id: "3032", name: "Hand Blender" },
	{ id: "303237", parent_id: "3032", name: "Roti & Khakra Makers" },
	{ id: "303334", parent_id: "3033", name: "Air Coolers" },
	{ id: "303335", parent_id: "3033", name: "Air Purifier" },
	{ id: "303336", parent_id: "3033", name: "Exhaust Fans" },
	{ id: "303337", parent_id: "3033", name: "Ceiling Fans" },
	{ id: "303338", parent_id: "3033", name: "Inverter & Battery" },
	{ id: "303339", parent_id: "3033", name: "Remote Controllers" },
	{ id: "303340", parent_id: "3033", name: "Room Heater" },
	{ id: "303341", parent_id: "3033", name: "Sewing Machine" },
	{ id: "303342", parent_id: "3033", name: "Vaccum Cleaners" },
	{ id: "303343", parent_id: "3033", name: "Water Geysers" },
	{ id: "303344", parent_id: "3033", name: "Water Purifier" },
	{ id: "4041", parent_id: "40", name: "TV Audio Accessories" },
	{ id: "404142", parent_id: "4041", name: "Data Cables" },
	{ id: "404143", parent_id: "4041", name: "Microphones" },
	{ id: "404144", parent_id: "4041", name: "Remote Controllers" },
	{ id: "40414243", parent_id: "404142", name: "HDMI Cable" },
	{ id: "40414244", parent_id: "404142", name: "Aux Cable" },
	{ id: "40414245", parent_id: "404142", name: "VGA Cable" },
	{ id: "40414246", parent_id: "404142", name: "Display Port Cable" },
	{ id: "40414247", parent_id: "404142", name: "DVI Cable" },
	{ id: "40414248", parent_id: "404142", name: "Fibre Optic Cable" },
	{ id: "40414249", parent_id: "404142", name: "Headphone Adapter" },
	{ id: "40414250", parent_id: "404142", name: "LAN Cable" },
	{ id: "40414251", parent_id: "404142", name: "Converters Adapter" },
	{ id: "5051", parent_id: "50", name: "Cables & Adapter" },
	{ id: "505152", parent_id: "5051", name: "Data Cables" },
	{ id: "505153", parent_id: "5051", name: "Gaming Adapter" },
	{ id: "505154", parent_id: "5051", name: "TV out Cable" },
];

const CategoryList = () => {
	const convert = (data) => {
		var ans = {};
		try {
			data = data.sort((a, b) => {
				if (a.id.length != b.id.length) return b.id.length - a.id.length;
				return a > b ? -1 : 1;
			});
			for (let rec of data) {
				let tmp = { ...rec };
				delete tmp.id;
				ans[rec.id] = { ...tmp, child: {} };
			}
			for (let rec of data) {
				if (rec.parent_id) {
					ans[rec.parent_id].child[rec.id] = ans[rec.id];
					delete ans[rec.id];
				}
			}
		} catch (error) {
			console.log(error);
		}
		return ans;
	};

	const generateData = (data) => {
		var details = [];
		for (let key in data) {
			let end = Object.keys(data[key].child).length === 0;
			let cur = data[key];
			details.push(
				<details
					className={
						"tree-nav__item" + (!end ? " is-expandable" : " not-expandable")
					}
				>
					<summary className="tree-nav__item-title">
						<div>
							{cur.name} (<Link to={`/admin/category/${key}`}>{key}</Link>)
						</div>
						<div>
							<Link
								to={`/admin/category/info/${key}`}
								className="action-button"
							>
								info
							</Link>
							<Link
								to={`/admin/category/edit/${key}`}
								className="action-button"
							>
								Edit
							</Link>
						</div>
					</summary>
					{generateData(data[key].child)}
				</details>
			);
		}
		return details;
	};

	return <div>{generateData(convert(category_data))}</div>;
};

export default CategoryList;

// var parent_id = "5051";
// var categories_list = "Data Cables,Gaming Adapter,TV out Cable";
// function generate(categories, pid) {
//   var id = parseInt(pid.substring(pid.length-2)) + 1;
//   var ans = [];
//   var all = categories.split(",");
//   for(let cat of all) {
//     ans.push({
//       id: pid + id,
//       parent_id: pid,
//       name: cat
//     });
//     ++id;
//   }
//   return ans;
// }

// console.log(generate(categories_list,parent_id));
