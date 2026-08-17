/* =========================================================
   สวดมนต์ทุกวัน — app.js
   ========================================================= */

/* ---------------- DATA ---------------- */
const CATEGORIES = ["ทั้งหมด","ทำวัตรเช้า-เย็น","สวดบูชาพระ","แผ่เมตตา","เสริมดวง","ขอพร","โอกาสพิเศษ"];

const PRAYERS = [
  {
    id:"jinapanjara",
    title:"บทสวดชินบัญชร (ฉบับย่อ)",
    category:"เสริมดวง",
    icon:"assets/lamp.png",
    badge:"แนะนำวันนี้",
    duration:"15 นาที",
    popularity:12345,
    desc:"เสริมดวง เสริมสิริมงคล ป้องกันภัยอันตราย แคล้วคลาดปลอดภัย",
    lines:[
      "นะโม ตัสสะ ภะคะวะโต อะระหะโต สัมมาสัมพุทธัสสะ (3 จบ)",
      "ชะยาสะนากะตา พุทธา เชตวา มารัง สะวาหะนัง",
      "จะตุสัจจาสะภัง ระสัง เย ปิวิงสุ นะราสะภา",
      "(บทสวดฉบับเต็มมี 15 บท แนะนำสวดตามหนังสือสวดมนต์ฉบับสมบูรณ์)",
      "ขอให้การสวดมนต์บทนี้ เสริมสิริมงคล คุ้มครองภัย",
      "แคล้วคลาดปลอดภัยแด่ท่านและครอบครัวทุกท่านเทอญ สาธุ"
    ]
  },
  {
    id:"metta-self",
    title:"แผ่เมตตาให้ตนเอง",
    category:"แผ่เมตตา",
    icon:"assets/prayer-hands.png",
    duration:"2 นาที",
    popularity:8210,
    desc:"ตั้งจิตให้อภัยและรักตัวเอง ก่อนแผ่เมตตาให้ผู้อื่น",
    lines:[
      "อะหัง สุขิโต โหมิ",
      "(ขอให้ข้าพเจ้ามีความสุข)",
      "อะหัง นิททุกโข โหมิ",
      "(ขอให้ข้าพเจ้าปราศจากความทุกข์)",
      "อะหัง อะเวโร โหมิ",
      "(ขอให้ข้าพเจ้าปราศจากเวร)",
      "อะหัง อัพยาปัชโฌ โหมิ",
      "(ขอให้ข้าพเจ้าปราศจากความเบียดเบียน)",
      "สุขี อัตตานัง ปะริหะรามิ",
      "(ขอให้ข้าพเจ้ารักษาตนให้มีความสุขตลอดไป)"
    ]
  },
  {
    id:"wish",
    title:"คำอธิษฐานขอพร",
    category:"ขอพร",
    icon:"assets/prayer-heart.png",
    duration:"2 นาที",
    popularity:5432,
    desc:"ตั้งจิตอธิษฐานขอพรสิ่งศักดิ์สิทธิ์ให้ชีวิตราบรื่น",
    lines:[
      "ขอตั้งจิตอธิษฐาน ด้วยใจที่สงบและกตัญญู",
      "ขอให้สิ่งศักดิ์สิทธิ์ทั้งหลายในสากลโลก จงเป็นสักขีพยาน",
      "ขอให้ข้าพเจ้าและครอบครัว มีสุขภาพแข็งแรง จิตใจเข้มแข็ง",
      "ขอให้การงานเจริญรุ่งเรือง มีสติปัญญาในการดำเนินชีวิต",
      "ขอให้พบเจอแต่สิ่งดี ๆ แคล้วคลาดจากภยันตรายทั้งปวง สาธุ"
    ]
  },
  {
    id:"popular",
    title:"บทสวดยอดนิยม",
    category:"เสริมดวง",
    icon:"assets/prayer-star.png",
    duration:"รวมยอดฮิต",
    popularity:9999,
    desc:"รวมบทสวดที่คนสวดมากที่สุดในแอปนี้ ไปดูกันเลย",
    lines:[
      "แตะ “ดูทั้งหมด” ที่หน้าแรก แล้วเลือกหมวด “เสริมดวง” หรือเรียงตามความนิยม",
      "เพื่อดูบทสวดยอดฮิตทั้งหมดของแอปนี้ได้เลยนะคะ 🪷"
    ]
  },
  {
    id:"birthday",
    title:"บทสวดมนต์วันเกิด",
    category:"โอกาสพิเศษ",
    icon:"assets/prayer-lotus.png",
    duration:"5 นาที",
    popularity:3210,
    desc:"ตั้งจิตอธิษฐานในวันคล้ายวันเกิด ระลึกถึงบุญคุณและตั้งเป้าหมายใหม่",
    lines:[
      "นะโม ตัสสะ ภะคะวะโต อะระหะโต สัมมาสัมพุทธัสสะ (3 จบ)",
      "ในวาระวันคล้ายวันเกิดนี้ ข้าพเจ้าขอตั้งจิตระลึกถึงพระคุณบิดามารดาผู้ให้กำเนิด",
      "ขอตั้งปณิธานที่จะทำความดี ละเว้นความชั่ว ทำจิตใจให้ผ่องใส",
      "ขอให้อายุ วรรณะ สุขะ พละ ปฏิภาณ ธนสารสมบัติ จงมีแด่ข้าพเจ้า",
      "ขอให้เจริญยิ่ง ๆ ขึ้นไปในธรรมและในทางโลก สาธุ"
    ]
  },
  {
    id:"itipiso",
    title:"บทพุทธคุณ (อิติปิโส)",
    category:"สวดบูชาพระ",
    icon:"assets/lamp.png",
    duration:"2 นาที",
    popularity:9876,
    desc:"สรรเสริญพระคุณของพระพุทธเจ้า นิยมสวดก่อนทำสมาธิ",
    lines:[
      "อิติปิ โส ภะคะวา",
      "อะระหัง สัมมาสัมพุทโธ",
      "วิชชาจะระณะสัมปันโน สุคะโต โลกะวิทู",
      "อะนุตตะโร ปุริสะทัมมะสาระถิ",
      "สัตถา เทวะมะนุสสานัง พุทโธ ภะคะวาติ"
    ]
  },
  {
    id:"trisarana",
    title:"บทไตรสรณคมน์",
    category:"ทำวัตรเช้า-เย็น",
    icon:"assets/lamp.png",
    duration:"2 นาที",
    popularity:7654,
    desc:"การถึงพระพุทธ พระธรรม พระสงฆ์ เป็นที่พึ่งที่ระลึก",
    lines:[
      "พุทธัง สะระณัง คัจฉามิ",
      "ธัมมัง สะระณัง คัจฉามิ",
      "สังฆัง สะระณัง คัจฉามิ",
      "ทุติยัมปิ พุทธัง สะระณัง คัจฉามิ",
      "ทุติยัมปิ ธัมมัง สะระณัง คัจฉามิ",
      "ทุติยัมปิ สังฆัง สะระณัง คัจฉามิ",
      "ตะติยัมปิ พุทธัง สะระณัง คัจฉามิ",
      "ตะติยัมปิ ธัมมัง สะระณัง คัจฉามิ",
      "ตะติยัมปิ สังฆัง สะระณัง คัจฉามิ"
    ]
  },
  {
    id:"metta-all",
    title:"แผ่เมตตาให้สรรพสัตว์",
    category:"แผ่เมตตา",
    icon:"assets/prayer-hands.png",
    duration:"3 นาที",
    popularity:6543,
    desc:"แผ่ความปรารถนาดีให้สรรพสัตว์ทั้งหลายพ้นทุกข์",
    lines:[
      "สัพเพ สัตตา สัตว์ทั้งหลายที่เป็นเพื่อนทุกข์ เกิด แก่ เจ็บ ตาย ด้วยกันทั้งหมดทั้งสิ้น",
      "จงเป็นสุขเป็นสุขเถิด อย่าได้มีเวรแก่กันและกันเลย",
      "จงเป็นสุขเป็นสุขเถิด อย่าได้เบียดเบียนซึ่งกันและกันเลย",
      "จงเป็นสุขเป็นสุขเถิด อย่าได้มีความทุกข์กายทุกข์ใจเลย",
      "จงมีความสุขกายสุขใจ รักษาตนให้พ้นจากทุกข์ภัยทั้งสิ้นเทอญ"
    ]
  },
  {
    id:"namotassa",
    title:"บทนอบน้อมพระพุทธเจ้า",
    category:"ทำวัตรเช้า-เย็น",
    icon:"assets/lamp.png",
    duration:"1 นาที",
    popularity:4321,
    desc:"บทตั้งจิตนอบน้อม สวดก่อนบทสวดมนต์บทใด ๆ",
    lines:[
      "นะโม ตัสสะ ภะคะวะโต อะระหะโต สัมมาสัมพุทธัสสะ",
      "นะโม ตัสสะ ภะคะวะโต อะระหะโต สัมมาสัมพุทธัสสะ",
      "นะโม ตัสสะ ภะคะวะโต อะระหะโต สัมมาสัมพุทธัสสะ"
    ]
  },
  {
    id:"ratanattaya-prostration",
    title:"บทกราบพระรัตนตรัย",
    readerHeading:"บทกราบพระรัตนตรัย",
    category:"ทำวัตรเช้า-เย็น",
    icon:"assets/lamp.png",
    duration:"2 นาที",
    popularity:0,
    desc:"ใช้สวดหลังนะโม 3 จบ ก่อนเข้าสู่บทไตรสรณคมน์ เพื่อตั้งจิตนอบน้อมต่อพระรัตนตรัย",
    lines:[
      "## กราบพระพุทธเจ้า",
      "อะระหัง สัมมาสัมพุทโธ ภะคะวา",
      "พุทธัง ภะคะวันตัง อะภิวาเทมิ",
      "(กราบ)",
      "## กราบพระธรรม",
      "สวากขาโต ภะคะวะตา ธัมโม",
      "ธัมมัง นะมัสสามิ",
      "(กราบ)",
      "## กราบพระสงฆ์",
      "สุปะฏิปันโน ภะคะวะโต สาวะกะสังโฆ",
      "สังฆัง นะมามิ",
      "(กราบ)",
      "ความหมายโดยย่อ: ระลึกและนอบน้อมต่อพระพุทธ พระธรรม และพระสงฆ์ ก่อนเริ่มสวดมนต์บทอื่น ๆ เป็นการตั้งจิตให้สงบและมีพระรัตนตรัยเป็นที่พึ่ง"
    ]
  },
  {
    id:"ratanattaya-praise",
    title:"บทสรรเสริญพระรัตนตรัย",
    readerHeading:"บทสรรเสริญพระรัตนตรัย",
    category:"สวดบูชาพระ",
    icon:"assets/prayer-lotus.png",
    duration:"5 นาที",
    popularity:0,
    desc:"บทสรรเสริญคุณของพระพุทธ พระธรรม และพระสงฆ์",
    lines:[
      "## บทพุทธคุณ",
      "อิติปิโส ภะคะวา อะระหัง สัมมาสัมพุทโธ",
      "วิชชาจะระณะสัมปันโน สุคะโต โลกะวิทู",
      "อะนุตตะโร ปุริสะทัมมะสาระถิ",
      "สัตถา เทวะมะนุสสานัง",
      "พุทโธ ภะคะวาติ",
      "ความหมายโดยย่อ: สรรเสริญพระคุณของพระพุทธเจ้า ผู้ตรัสรู้ชอบด้วยพระองค์เอง ผู้ถึงพร้อมด้วยวิชชาและจรณะ และเป็นศาสดาของเทวดาและมนุษย์",
      "## บทธรรมคุณ",
      "สวากขาโต ภะคะวะตา ธัมโม",
      "สันทิฏฐิโก อะกาลิโก เอหิปัสสิโก",
      "โอปะนะยิโก ปัจจัตตัง เวทิตัพโพ วิญญูหีติ",
      "ความหมายโดยย่อ: สรรเสริญพระธรรมที่พระพุทธเจ้าตรัสไว้ดีแล้ว สามารถรู้เห็นได้ด้วยตนเอง ไม่จำกัดกาล และผู้ปฏิบัติพึงรู้ได้เฉพาะตน",
      "## บทสังฆคุณ",
      "สุปะฏิปันโน ภะคะวะโต สาวะกะสังโฆ",
      "อุชุปะฏิปันโน ภะคะวะโต สาวะกะสังโฆ",
      "ญายะปะฏิปันโน ภะคะวะโต สาวะกะสังโฆ",
      "สามีจิปะฏิปันโน ภะคะวะโต สาวะกะสังโฆ",
      "ยะทิทัง จัตตาริ ปุริสะยุคานิ",
      "อัฏฐะ ปุริสะปุคคะลา",
      "เอสะ ภะคะวะโต สาวะกะสังโฆ",
      "อาหุเนยโย ปาหุเนยโย",
      "ทักขิเนยโย อัญชะลีกะระณีโย",
      "อะนุตตะรัง ปุญญักเขตตัง โลกัสสาติ",
      "ความหมายโดยย่อ: สรรเสริญพระสงฆ์สาวกของพระพุทธเจ้า ผู้ปฏิบัติดี ปฏิบัติตรง ปฏิบัติเพื่อรู้ธรรม และเป็นเนื้อนาบุญอันยอดเยี่ยมของโลก"
    ]
  },
  {
    id:"bahum-mahaka",
    title:"พาหุงมหากา (พุทธชัยมงคลคาถา)",
    readerHeading:"บทพาหุง — พุทธชัยมงคลคาถา",
    category:"สวดบูชาพระ",
    icon:"assets/lamp.png",
    duration:"10 นาที",
    popularity:0,
    desc:"พระคาถาว่าด้วยชัยชนะอันเป็นมงคลของพระพุทธเจ้า พร้อมบทมหาการุณิโก",
    lines:[
      "## ๑.",
      "พาหุง สะหัสสะมะภินิมมิตะสาวุธันตัง",
      "ครีเมขะลัง อุทิตะโฆระสะเสนะมารัง",
      "ทานาทิธัมมะวิธินา ชิตะวา มุนินโท",
      "ตันเตชะสา ภะวะตุ เต ชะยะมังคะลานิ",
      "## ๒.",
      "มาราติเรกะมะภิยุชฌิตะสัพพะรัตติง",
      "โฆรัมปะนาฬะวะกะมักขะมะถัทธะยักขัง",
      "ขันตีสุทันตะวิธินา ชิตะวา มุนินโท",
      "ตันเตชะสา ภะวะตุ เต ชะยะมังคะลานิ",
      "## ๓.",
      "นาฬาคิริง คะชะวะรัง อะติมัตตะภูตัง",
      "ทาวัคคิจักกะมะสะนีวะ สุทารุณันตัง",
      "เมตตัมพุเสกะวิธินา ชิตะวา มุนินโท",
      "ตันเตชะสา ภะวะตุ เต ชะยะมังคะลานิ",
      "## ๔.",
      "อุกขิตตะขัคคะมะติหัตถะสุทารุณันตัง",
      "ธาวันติโยชะนะปะถังคุลิมาละวันตัง",
      "อิทธีภิสังขะตะมะโน ชิตะวา มุนินโท",
      "ตันเตชะสา ภะวะตุ เต ชะยะมังคะลานิ",
      "## ๕.",
      "กัตวานะ กัฏฐะมุทะรัง อิวะ คัพภินียา",
      "จิญจายะ ทุฏฐะวะจะนัง ชะนะกายะมัชเฌ",
      "สันเตนะ โสมะวิธินา ชิตะวา มุนินโท",
      "ตันเตชะสา ภะวะตุ เต ชะยะมังคะลานิ",
      "## ๖.",
      "สัจจัง วิหายะ มะติสัจจะกะวาทะเกตุง",
      "วาทาภิโรปิตะมะนัง อะติอันธะภูตัง",
      "ปัญญาปะทีปะชะลิโต ชิตะวา มุนินโท",
      "ตันเตชะสา ภะวะตุ เต ชะยะมังคะลานิ",
      "## ๗.",
      "นันโทปะนันทะภุชะคัง วิพุธัง มะหิทธิง",
      "ปุตเตนะ เถระภุชะเคนะ ทะมาปะยันโต",
      "อิทธูปะเทสะวิธินา ชิตะวา มุนินโท",
      "ตันเตชะสา ภะวะตุ เต ชะยะมังคะลานิ",
      "## ๘.",
      "ทุคคาหะทิฏฐิภุชะเคนะ สุทัฏฐะหัตถัง",
      "พรัหมัง วิสุทธิชุติมิทธิพะกาภิธานัง",
      "ญาณาคะเทนะ วิธินา ชิตะวา มุนินโท",
      "ตันเตชะสา ภะวะตุ เต ชะยะมังคะลานิ",
      "## บทสรุป",
      "เอตาปิ พุทธะชะยะมังคะละอัฏฐะคาถา",
      "โย วาจะโน ทินะทิเน สะระเต มะตันที",
      "หิตวานะเนกะวิวิธานิ จุปัททะวานิ",
      "โมกขัง สุขัง อะธิคะเมยยะ นะโร สะปัญโญ",
      "## บทมหาการุณิโก",
      "มหาการุณิโก นาโถ",
      "หิตายะ สัพพะปาณินัง",
      "ปูเรตวา ปาระมี สัพพา",
      "ปัตโต สัมโพธิมุตตะมัง",
      "เอเตนะ สัจจะวัชเชนะ",
      "โหตุ เต ชะยะมังคะลัง",
      "ชะยันโต โพธิยา มูเล",
      "สักยานัง นันทิวัฑฒะโน",
      "เอวัง ตวัง วิชะโย โหหิ",
      "ชะยัสสุ ชะยะมังคะเล",
      "อะปะราชิตะปัลลังเก",
      "สีเส ปะฐะวิโปกขะเร",
      "อะภิเสเก สัพพะพุทธานัง",
      "อัคคัปปัตโต ปะโมทะติ",
      "สุนักขัตตัง สุมังคะลัง",
      "สุปะภาตัง สุหุฏฐิตัง",
      "สุขะโณ สุมุหุตโต จะ",
      "สุยิฏฐัง พรัหมะจาริสุ",
      "ปะทักขิณัง กายะกัมมัง",
      "วาจากัมมัง ปะทักขิณัง",
      "ปะทักขิณัง มะโนกัมมัง",
      "ปะณิธี เต ปะทักขิณา",
      "ปะทักขิณานิ กัตวานะ",
      "ละภันตัตเถ ปะทักขิเณ"
    ]
  },
  {
    id:"jinapanjara-full",
    title:"บทชินบัญชร",
    readerHeading:"คาถาชินบัญชร",
    category:"เสริมดวง",
    icon:"assets/lamp.png",
    duration:"15 นาที",
    popularity:0,
    desc:"นิยมสวดเพื่อความเป็นสิริมงคลและความอุ่นใจ",
    lines:[
      "## ตั้งนะโม 3 จบก่อนสวด",
      "## ๑",
      "ชะยาสะนากะตา พุทธา",
      "เชตวา มารัง สะวาหะนัง",
      "จะตุสัจจาสะภัง ระสัง",
      "เย ปิวิงสุ นะราสะภา",
      "## ๒",
      "ตัณหังกะราทะโย พุทธา",
      "อัฏฐะวีสะติ นายะกา",
      "สัพเพ ปะติฏฐิตา มัยหัง",
      "มัตถะเก เต มุนิสสะรา",
      "## ๓",
      "สีเส ปะติฏฐิโต มัยหัง",
      "พุทโธ ธัมโม ทะวิโลจะเน",
      "สังโฆ ปะติฏฐิโต มัยหัง",
      "อุเร สัพพะคุณากะโร",
      "## ๔",
      "หะทะเย เม อะนุรุทโธ",
      "สารีปุตโต จะ ทักขิเณ",
      "โกณฑัญโญ ปิฏฐิภาคัสมิง",
      "โมคคัลลาโน จะ วามะเก",
      "## ๕",
      "ทักขิเณ สะวะเน มัยหัง",
      "อาสุง อานันทะราหุโล",
      "กัสสะโป จะ มะหานาโม",
      "อุภาสุง วามะโสตะเก",
      "## ๖",
      "เกสันเต ปิฏฐิภาคัสมิง",
      "สุริโยวะ ปะภังกะโร",
      "นิสินโน สิริสัมปันโน",
      "โสภิโต มุนิปุงคะโว",
      "## ๗",
      "กุมาระกัสสะโป เถโร",
      "มะเหสี จิตตะวาทะโก",
      "โส มัยหัง วะทะเน นิจจัง",
      "ปะติฏฐาสิ คุณากะโร",
      "## ๘",
      "ปุณโณ อังคุลิมาโล จะ",
      "อุปาลี นันทะสีวะลี",
      "เถรา ปัญจะ อิเม ชาตา",
      "นะลาเต ติละกา มะมะ",
      "## ๙",
      "เสสาสีติ มะหาเถรา",
      "วิชิตา ชินะสาวะกา",
      "เอตาสีติ มะหาเถรา",
      "ชิตะวันโต ชิโนระสา",
      "ชะลันตา สีละเตเชนะ",
      "อังคะมังเคสุ สัณฐิตา",
      "## ๑๐",
      "ระตะนัง ปุระโต อาสิ",
      "ทักขิเณ เมตตะสุตตะกัง",
      "ธะชัคคัง ปัจฉะโต อาสิ",
      "วาเม อังคุลิมาละกัง",
      "## ๑๑",
      "ขันธะโมระปะริตตัญจะ",
      "อาฏานาฏิยะสุตตะกัง",
      "อากาเส ฉะทะนัง อาสิ",
      "เสสา ปาการะสัณฐิตา",
      "## ๑๒",
      "ชินา นานาวะระสังยุตตา",
      "สัตตัปปาการะลังกะตา",
      "วาตะปิตตาทิสัญชาตา",
      "พาหิรัชฌัตตุปัททะวา",
      "## ๑๓",
      "อะเสสา วินะยัง ยันตุ",
      "อะนันตะชินะเตชะสา",
      "วะสะโต เม สะกิจเจนะ",
      "สะทา สัมพุทธะปัญชะเร",
      "## ๑๔",
      "ชินะปัญชะระมัชฌัมหิ",
      "วิหะรันตัง มะฮีตะเล",
      "สะทา ปาเลนตุ มัง สัพเพ",
      "เต มะหาปุริสาสะภา",
      "## ๑๕",
      "อิจเจวะมันโต",
      "สุคุตโต สุรักโข",
      "ชินานุภาเวนะ",
      "ชิตูปัททะโว",
      "ธัมมานุภาเวนะ",
      "ชิตาริสังโฆ",
      "สังฆานุภาเวนะ",
      "ชิตันตะราโย",
      "สัทธัมมานุภาวะปาลิโต",
      "จะรามิ ชินะปัญชะเรติ"
    ]
  },
  {
    id:"maha-chakraphat",
    title:"คาถามหาจักรพรรดิ",
    readerHeading:"คาถามหาจักรพรรดิ — แนะนำ 9 จบ",
    category:"เสริมดวง",
    icon:"assets/lamp.png",
    badge:"แนะนำ 9 จบ",
    duration:"5 นาที",
    popularity:0,
    desc:"ใช้เป็นบทภาวนา ตั้งจิต และระลึกถึงคุณพระรัตนตรัยและครูบาอาจารย์",
    lines:[
      "คำแนะนำ: ถ้าวันไหนมีเวลา จะสวด 9 หรือ 27 จบก็ได้ ไม่จำเป็นต้องฝืนจำนวน",
      "นะโม พุทธายะ",
      "พระพุทธะ ไตรรัตนะญาณ",
      "มณีนพรัตน์ สีสะหัสสะ สุธรรมา",
      "พุทโธ ธัมโม สังโฆ",
      "ยะธาพุทโมนะ",
      "พุทธะบูชา ธัมมะบูชา สังฆะบูชา",
      "อัคคีทานัง วะรังคันธัง",
      "สีวลี จะ มหาเถรัง",
      "อะหัง วันทามิ ทูระโต",
      "อะหัง วันทามิ ธาตุโย",
      "อะหัง วันทามิ สัพพะโส",
      "พุทธะ ธัมมะ สังฆะ ปูเชมิ"
    ]
  },
  {
    id:"karaniya-metta-sutta",
    title:"กรณียเมตตสูตร",
    readerHeading:"กรณียเมตตสูตร",
    category:"แผ่เมตตา",
    icon:"assets/prayer-hands.png",
    duration:"7 นาที",
    popularity:0,
    desc:"พระสูตรสำคัญสำหรับแผ่เมตตาและเจริญเมตตาภาวนา ช่วยให้จิตใจสงบ ลดความโกรธและความหวาดกลัว",
    lines:[
      "## บทสวดบาลี",
      "กรณียมัตถกุสเลนะ",
      "ยันตัง สันตัง ปทัง อภิสเมจจะ",
      "สักโก อุชู จะ สุหุชู จะ",
      "สุวะโจ จัสสะ มุทุ อะนะติมานี",
      "สันตุสสะโก จะ สุภะโร จะ",
      "อัปปะกิจโจ จะ สัลละหุกะวุตติ",
      "สันตินทริโย จะ นิปะโก จะ",
      "อัปปะคัพโภ กุเลสุ อะนะนุคิทโธ",
      "นะ จะ ขุททัง สะมาจะเร กิญจิ",
      "เยนะ วิญญู ปะเร อุปะวะเทยยุง",
      "สุขิโน วา เขมิโน โหนตุ",
      "สัพเพ สัตตา ภะวันตุ สุขิตัตตา",
      "เย เกจิ ปาณะภูตัตถิ",
      "ตะสา วา ถาวะรา วา อะนะวะเสสา",
      "ทีฆา วา เย มะหันตา วา",
      "มัชฌิมา รัสสะกา อะณุกะถูลา",
      "ทิฏฐา วา เย จะ อะทิฏฐา",
      "เย จะ ทูเร วะสันติ อะวิทูเร",
      "ภูตา วา สัมภะเวสี วา",
      "สัพเพ สัตตา ภะวันตุ สุขิตัตตา",
      "นะ ปะโร ปะรัง นิกุพเพถะ",
      "นาติมัญเญถะ กัตถะจิ นัง กิญจิ",
      "พยาโรสะนา ปะฏีฆะสัญญา",
      "นาญญะมัญญัสสะ ทุกขะมิจเฉยยะ",
      "มาตา ยะถา นิยัง ปุตตัง",
      "อายุสา เอกะปุตตะมะนุรักเข",
      "เอวัมปิ สัพพะภูเตสุ",
      "มานะสัม ภาวะเย อะปะริมาณัง",
      "เมตตัญจะ สัพพะโลกัสมิง",
      "มานะสัม ภาวะเย อะปะริมาณัง",
      "อุทธัง อะโธ จะ ติริยัญจะ",
      "อะสัมพาธัง อะเวรัง อะสะปัตตัง",
      "ติฏฐัญจะรัง นิสินโน วา",
      "สะยาโน วา ยาวะตัสสะ วิคะตะมิทโธ",
      "เอตัง สะติง อะธิฏเฐยยะ",
      "พรัหมะเมตัง วิหารัง อิธะมาหุ",
      "ทิฏฐิญจะ อะนุปะคัมมะ สีละวา",
      "ทัสสะเนนะ สัมปันโน",
      "กาเมสุ วิเนยยะ เคธัง",
      "นะ หิ ชาตุ คัพภะเสยยัง ปุนะเรตีติ",
      "ความหมายโดยย่อ: พระสูตรนี้สอนให้บุคคลประพฤติตนด้วยความสุจริต อ่อนโยน ไม่ถือตัว มีความพอเพียง และแผ่เมตตาปรารถนาให้สรรพสัตว์ทั้งหลาย ไม่ว่าจะอยู่ใกล้หรือไกล ใหญ่หรือเล็ก มองเห็นหรือมองไม่เห็น มีความสุข ปลอดภัย ปราศจากเวรและความเบียดเบียน เปรียบเสมือนมารดาที่ปกป้องบุตรเพียงคนเดียวด้วยชีวิตของตน"
    ]
  },
  {
    id:"sivali-worship",
    title:"บทบูชาพระสีวลี",
    readerHeading:"บทบูชาพระสีวลี — 1 หรือ 3 จบ",
    category:"เสริมดวง",
    icon:"assets/prayer-star.png",
    badge:"1 หรือ 3 จบ",
    duration:"3 นาที",
    popularity:0,
    desc:"ตามคติไทยนิยมบูชาเกี่ยวกับลาภ ความอุดมสมบูรณ์ และความคล่องตัว",
    lines:[
      "## ตั้งนะโม 3 จบ",
      "นะโม ตัสสะ ภะคะวะโต อะระหะโต สัมมาสัมพุทธัสสะ",
      "นะโม ตัสสะ ภะคะวะโต อะระหะโต สัมมาสัมพุทธัสสะ",
      "นะโม ตัสสะ ภะคะวะโต อะระหะโต สัมมาสัมพุทธัสสะ",
      "## คาถาบูชาพระสีวลี",
      "สีวะลี จะ มะหาเถโร",
      "เทวะตานะระปูชิโต",
      "โสระโห ปัจจะยาทิมหิ",
      "สีวะลี จะ มะหาเถโร",
      "ยักขาเทวาภิปูชิโต",
      "โสระโห ปัจจะยาทิมหิ",
      "อะหัง วันทามิ ตัง สะทา",
      "## ✨ คาถาพระสีวลี เรียกทรัพย์",
      "คำแนะนำ: บทสั้น เหมาะสำหรับสวดต่อจากบทบูชา",
      "นะ ชาลีติ",
      "ปะสิทธิลาภา",
      "ปะสันนะจิตตา",
      "สะทา โหนตุ",
      "ปิยัง มะมะ",
      "สัพเพ ชะนา",
      "พะหู ชะนา",
      "สัพเพ ทิสา",
      "สะมาคะตา",
      "กาละโภชะนา",
      "วิกาละโภชะนา",
      "อาคัจฉันติ",
      "ปิยัง มะมะ"
    ]
  },
  {
    id:"vesavana-worship",
    title:"บทบูชาท้าวเวสสุวรรณ",
    readerHeading:"บทบูชาท้าวเวสสุวรรณ — 1 หรือ 9 จบ",
    category:"สวดบูชาพระ",
    icon:"assets/prayer-star.png",
    badge:"1 หรือ 9 จบ",
    duration:"4 นาที",
    popularity:0,
    desc:"นิยมบูชาเพื่อความคุ้มครอง ความเป็นสิริมงคล และโภคทรัพย์",
    lines:[
      "## ตั้งนะโม 3 จบ",
      "นะโม ตัสสะ ภะคะวะโต อะระหะโต สัมมาสัมพุทธัสสะ",
      "นะโม ตัสสะ ภะคะวะโต อะระหะโต สัมมาสัมพุทธัสสะ",
      "นะโม ตัสสะ ภะคะวะโต อะระหะโต สัมมาสัมพุทธัสสะ",
      "## 🛡️ คาถาบูชาท้าวเวสสุวรรณ",
      "อิติปิโส ภะคะวา ยมราชาโน",
      "ท้าวเวสสุวรรณโณ มรณัง สุขัง",
      "อะหัง สุคะโต นะโม พุทธายะ",
      "ท้าวเวสสุวรรณโณ จาตุมหาราชิกา",
      "ยักขะพันตา ภัทภูริโต",
      "เวสสะ พุสะ พุทธัง อะระหัง",
      "พุทโธ ท้าวเวสสุวรรณโณ",
      "นะโม พุทธายะ",
      "## 💰 คาถาท้าวเวสสุวรรณ ฉบับย่อ",
      "คำแนะนำ: นิยมสวด 9 จบ เพื่อความเป็นสิริมงคล",
      "เวส สะ พุ สะ",
      "เวส สะ พุ สะ",
      "เวส สะ พุ สะ",
      "## <img class=\"flower-icon\" src=\"assets/flower-icon.png\" alt=\"\"> คำอธิษฐานหลังสวด",
      "คำแนะนำ: สามารถอธิษฐานด้วยภาษาของตัวเอง เช่น",
      "ข้าพเจ้าขอน้อมบูชาองค์ท้าวเวสสุวรรณ",
      "ขออานุภาพแห่งคุณพระศรีรัตนตรัย และบารมีแห่งองค์ท้าวเวสสุวรรณ",
      "โปรดคุ้มครองข้าพเจ้าและครอบครัวให้แคล้วคลาดจากภยันตรายทั้งปวง",
      "ขอให้การงานราบรื่น การเงินคล่องตัว มีโชคลาภโดยสุจริต",
      "คิดประกอบกิจการงานสิ่งใดที่ดีงาม ขอให้สำเร็จสมปรารถนา",
      "ปราศจากอุปสรรค ศัตรู และสิ่งไม่เป็นมงคล",
      "ขอให้ข้าพเจ้ามีสติ ปัญญา และพบเจอแต่สิ่งที่ดีงามด้วยเทอญ",
      "สาธุ สาธุ สาธุ 🙏"
    ]
  },
  {
    id:"lakshmi-worship",
    title:"บทบูชาพระแม่ลักษมี",
    readerHeading:"บทสวดบูชาพระแม่ลักษมี",
    category:"ขอพร",
    icon:"assets/prayer-star.png",
    badge:"9 หรือ 108 จบ",
    duration:"5 นาที",
    popularity:0,
    desc:"ตามคติฮินดู พระแม่ลักษมีเกี่ยวข้องกับความอุดมสมบูรณ์ ความรุ่งเรือง โชคลาภ และความเป็นมงคล",
    lines:[
      "คำแนะนำ: เริ่มด้วยการตั้งจิตระลึกถึงพระแม่ แล้วภาวนา “โอม ศรี มหาลักษมีเย นะมะฮา” จะสวด 9 หรือ 108 จบตามกำลังและแนวปฏิบัติที่ศรัทธา",
      "## มหาลักษมีมนตรา",
      "โอม ศรี มหาลักษมี เจ นะมะฮา",
      "โอม ศรี มหาลักษมี เจ นะมะฮา",
      "โอม ศรี มหาลักษมี เจ นะมะฮา",
      "คำแนะนำ: นิยมสวด 9 จบ หรือ 108 จบ ตามสะดวก",
      "## อีกบทหนึ่งที่นิยม",
      "โอม ชยะ ศรี ลักษมี มาตา",
      "โอม ชยะ ศรี ลักษมี มาตา",
      "## ✨ มนตราขอพรพระแม่ลักษมี",
      "โอม ศรีม หรีม กะลีม",
      "มหาลักษมี นะมะฮา",
      "คำแนะนำ: สามารถสวด 9, 27 หรือ 108 จบ",
      "## <img class=\"flower-icon\" src=\"assets/flower-icon.png\" alt=\"\"> คำอธิษฐานหลังสวด",
      "ข้าพเจ้าขอน้อมบูชาพระแม่ลักษมี",
      "เทวีแห่งความอุดมสมบูรณ์ ความมั่งคั่ง และความเจริญรุ่งเรือง",
      "ขอพระแม่โปรดประทานพรให้ข้าพเจ้ามีความเจริญในหน้าที่การงาน",
      "มีทรัพย์สินเงินทองอย่างมั่นคง มีช่องทางแห่งความสำเร็จและความอุดมสมบูรณ์",
      "ขอให้เงินทองที่ได้มาเป็นทรัพย์ที่สุจริต และสามารถรักษาทรัพย์นั้นไว้ได้",
      "ขอให้ข้าพเจ้าพบเจอความรักที่ดี ผู้คนเมตตาอุปถัมภ์",
      "และขอให้สิ่งที่ข้าพเจ้าปรารถนาโดยชอบธรรม สำเร็จสมดังปรารถนาด้วยเทอญ",
      "โอม ศานติ ศานติ ศานติ 🙏"
    ]
  },
  {
    id:"millionaire-mantra",
    title:"คาถาเงินล้าน",
    readerHeading:"คาถาเงินล้าน — 9 จบ",
    category:"เสริมดวง",
    icon:"assets/prayer-star.png",
    badge:"9 จบ",
    duration:"5 นาที",
    popularity:0,
    desc:"บทภาวนาที่นิยมสืบเนื่องจากหลวงพ่อฤๅษีลิงดำ (พระราชพรหมยาน)",
    lines:[
      "คำแนะนำ: หากศรัทธาในสายหลวงพ่อฤๅษีลิงดำ สามารถใช้บทนี้เป็นส่วนของกิจวัตรได้ โดยไม่จำเป็นต้องยึดว่าจำนวนมากจะทำให้ได้ผลมากกว่า",
      "## ตั้งนะโม 3 จบ",
      "นะโม ตัสสะ ภะคะวะโต อะระหะโต สัมมาสัมพุทธัสสะ",
      "(3 จบ)",
      "## คาถาเงินล้าน",
      "สัมปะจิตฉามิ",
      "นาสังสิโม",
      "พรหมา จะ มหาเทวา สัพเพยักขา ปะรายันติ",
      "พรหมา จะ มหาเทวา อภิลาภา ภะวันตุ เม",
      "มหาปุญโญ มหาลาโภ ภะวันตุ เม",
      "มิเตพาหุหะติ",
      "พุทธะมะอะอุ นะโมพุทธายะ วิระทะโย วิระโคนายัง วิระหิงสา วิระทาสี วิระทาสา วิระอิตถิโย พุทธัสสะ มานีมามะ พุทธัสสะ สวาโหม",
      "สัมปะติจฉามิ",
      "เพ็ง เพ็ง พา พา หา หา ฤา ฤา",
      "## <img class=\"flower-icon\" src=\"assets/flower-icon.png\" alt=\"\"> วิธีสวด",
      "คำแนะนำ: นิยมสวด 9 จบ โดยตั้งจิตให้สงบ ไม่จำเป็นต้องเร่งสวด และอาจตั้งเจตนาเรื่องการงาน การเงิน และความคล่องตัวในชีวิตควบคู่ไปด้วย"
    ]
  },
  {
    id:"merit-dedication",
    title:"อุทิศส่วนกุศล",
    readerHeading:"อุทิศส่วนกุศล",
    category:"แผ่เมตตา",
    icon:"assets/prayer-hands.png",
    duration:"1 นาที",
    popularity:0,
    desc:"อุทิศแก่บิดามารดา ครูอาจารย์ ผู้มีพระคุณ ญาติ เจ้ากรรมนายเวร และสรรพสัตว์",
    lines:[
      "## บทอิทัง เม ญาตีนัง โหตุ",
      "อิทัง เม ญาตีนัง โหตุ",
      "สุขิตา โหนตุ ญาตะโย",
      "ความหมายโดยย่อ: ขอส่วนบุญนี้จงสำเร็จแก่ญาติทั้งหลายของข้าพเจ้า ขอญาติทั้งหลายของข้าพเจ้าจงมีความสุข"
    ]
  },
  {
    id:"bedtime-prayer",
    title:"อธิษฐานก่อนนอน",
    readerHeading:"อธิษฐานก่อนนอน",
    category:"ทำวัตรเช้า-เย็น",
    icon:"assets/prayer-heart.png",
    duration:"2 นาที",
    popularity:0,
    desc:"บทตั้งจิตก่อนพักผ่อน เพื่อระลึกถึงกุศลและเริ่มต้นวันใหม่ด้วยสติ",
    lines:[
      "ขออานุภาพแห่งคุณพระศรีรัตนตรัย และกุศลที่ข้าพเจ้าได้กระทำในวันนี้",
      "จงเป็นเหตุปัจจัยให้ข้าพเจ้ามีสติ ปัญญา และดำเนินชีวิตในทางที่ดีงาม",
      "ขอให้การงานราบรื่น พบโอกาสที่ดี มีผู้ใหญ่และผู้คนเมตตาเกื้อหนุน",
      "ขอให้การเงินคล่องตัว มีทรัพย์โดยสุจริต รู้จักรักษาและใช้ทรัพย์อย่างมีปัญญา",
      "ขอให้อุปสรรคทั้งหลายคลี่คลาย และมีความสามารถแก้ไขสิ่งต่าง ๆ ได้ด้วยสติ",
      "หากมีลาภอันสมควรแก่เหตุและบุญกุศล ขอให้ข้าพเจ้าได้พบลาภนั้น",
      "หากมีโอกาสที่ดี ขอให้ข้าพเจ้ามีปัญญามองเห็นและกล้าที่จะคว้าไว้",
      "ขอให้ข้าพเจ้าและบุคคลอันเป็นที่รัก ปลอดภัย สุขกาย สุขใจ",
      "และขอให้กุศลที่เกิดขึ้นนี้เป็นประโยชน์แก่สรรพสัตว์ทั้งหลาย",
      "ขอให้คืนนี้หลับอย่างสงบ และตื่นขึ้นมาด้วยจิตใจที่สดใส",
      "พร้อมสร้างเหตุแห่งความสำเร็จและความเจริญด้วยตนเอง",
      "สาธุ สาธุ สาธุ"
    ]
  }
];

const QUICK_TILES = [
  {icon:"assets/tile1.png",label:"สวดมนต์วันเกิด",id:"birthday"},
  {icon:"assets/tile2.png",label:"แผ่เมตตา",id:"metta-self"},
  {icon:"assets/tile3.png",label:"ขอพร",id:"wish"},
  {icon:"assets/tile4.png",label:"บทสวดยอดนิยม",id:"popular"}
];

const QUOTES = [
  {text:"การให้ธรรมะ ชนะการให้ทั้งปวง", by:"พุทธพจน์"},
  {text:"ผู้ให้ย่อมเป็นที่รัก", by:"พุทธสุภาษิต"},
  {text:"จิตที่ฝึกดีแล้ว นำสุขมาให้", by:"พุทธพจน์"},
  {text:"ความไม่ประมาท เป็นทางไม่ตาย", by:"พุทธพจน์"},
  {text:"ทำวันนี้ให้ดีที่สุด ปล่อยวางสิ่งที่ผ่านไป", by:"ธรรมะคำสอน"},
  {text:"สุขอื่นยิ่งกว่าความสงบใจ ไม่มี", by:"พุทธพจน์"},
  {text:"ทำดีได้ดี ทำชั่วได้ชั่ว", by:"สุภาษิตไทย"}
];

const BADGES = [
  {id:"d1", icon:"🌱", label:"เริ่มต้นวันแรก", need:1, type:"total"},
  {id:"d7", icon:"🔥", label:"ต่อเนื่อง 7 วัน", need:7, type:"streak"},
  {id:"d21", icon:'<img class="flower-icon" src="assets/flower-icon.png" alt="">', label:"ต่อเนื่อง 21 วัน", need:21, type:"streak"},
  {id:"t10", icon:'<img class="flower-icon" src="assets/flower-icon.png" alt="">', label:"สวดครบ 10 ครั้ง", need:10, type:"total"},
  {id:"t50", icon:"✨", label:"สวดครบ 50 ครั้ง", need:50, type:"total"},
  {id:"fav3", icon:"💗", label:"บันทึกโปรด 3 บท", need:3, type:"fav"}
];

const DOW_TH = ["จ","อ","พ","พฤ","ศ","ส","อา"]; // Mon..Sun

/* ---------------- STATE (localStorage) ---------------- */
const STORE_KEY = "suadmon_data_v1";
const DEFAULT_STATE = { completedDates:[], favorites:[], prayerHistory:[], customPrayerSets:[], goal:21, fontSize:"medium", reminderOn:false, reminderTime:"19:00", continuousOn:false, theme:"purple", profileName:"", profileMessage:"", profileFirstName:"", profileLastName:"", profileGender:"หญิง", profileTheme:"pink", profileBirthDate:"", profileEmail:"" };
function loadState(){
  try{
    const raw = localStorage.getItem(STORE_KEY);
    if(raw){
      const saved = JSON.parse(raw);
      return {...DEFAULT_STATE,...saved,customPrayerSets:Array.isArray(saved.customPrayerSets)?saved.customPrayerSets:[]};
    }
  }catch(e){}
  return {...DEFAULT_STATE,completedDates:[],favorites:[],prayerHistory:[],customPrayerSets:[]};
}
function saveState(){ localStorage.setItem(STORE_KEY, JSON.stringify(state)); }
let state = loadState();

/* ---------------- HELPERS ---------------- */
function todayStr(d=new Date()){
  const y=d.getFullYear(), m=String(d.getMonth()+1).padStart(2,"0"), day=String(d.getDate()).padStart(2,"0");
  return `${y}-${m}-${day}`;
}
function dowMon0(d){ return (d.getDay()+6)%7; } // Mon=0..Sun=6

function computeStreak(){
  const set = new Set(state.completedDates);
  let count = 0;
  let cur = new Date();
  // if today not done yet, streak still counts from yesterday backward
  if(!set.has(todayStr(cur))){
    cur.setDate(cur.getDate()-1);
  }
  while(set.has(todayStr(cur))){
    count++;
    cur.setDate(cur.getDate()-1);
  }
  return count;
}

function findPrayer(id){ return PRAYERS.find(p=>p.id===id); }
function getPrayerIcon(prayer){
  const iconsByCategory = {
    "ทำวัตรเช้า-เย็น":"assets/lamp.png",
    "สวดบูชาพระ":"assets/prayer-lotus.png",
    "แผ่เมตตา":"assets/prayer-heart.png",
    "เสริมดวง":"assets/prayer-hands.png"
  };
  return iconsByCategory[prayer.category] || prayer.icon;
}

/* ---------------- HERO GREETING / QUOTE ---------------- */
function renderHero(){
  const h = new Date().getHours();
  let greet, sub;
  if(h>=5 && h<11){ greet="สวัสดีตอนเช้า"; sub="ขอให้วันนี้เป็นวันที่ดีนะคะ"; }
  else if(h>=11 && h<17){ greet="สวัสดีตอนบ่าย"; sub="พักสักครู่ แล้วมาสวดมนต์กันนะคะ"; }
  else if(h>=17 && h<21){ greet="สวัสดีตอนเย็น"; sub="สวดมนต์ก่อนนอน ใจจะสงบขึ้นนะคะ"; }
  else{ greet="ราตรีสวัสดิ์"; sub="สวดมนต์สักนิด แล้วหลับฝันดีนะคะ"; }
  const displayGreeting = state.profileName ? `${greet} คุณ${state.profileName}` : greet;
  const displaySub = state.profileMessage || sub;
  document.getElementById("greetingText").innerHTML = `${displayGreeting} <span class="heart">💗</span>`;
  document.getElementById("greetingSub").innerHTML = `${displaySub} <span>💛</span>`;

  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(),0,0)) / 86400000);
  const q = QUOTES[dayOfYear % QUOTES.length];
  document.getElementById("quoteText").textContent = q.text;
  document.getElementById("quoteBy").textContent = `- ${q.by} -`;
}

/* ---------------- HOME: TODAY CAROUSEL ---------------- */
function renderCarousel(){
  const featured = [
    findPrayer("jinapanjara"),
    findPrayer("itipiso"),
    findPrayer("metta-self"),
    findPrayer("wish")
  ];
  const car = document.getElementById("todayCarousel");
  const dots = document.getElementById("todayDots");
  car.innerHTML = featured.map(p=>`
    <div class="today-item">
      <div class="ti-icon-wrap" style="background-image:url('${getPrayerIcon(p)}')"></div>
      <div class="ti-body">
        <div class="ti-title-row">
          <h3>${p.title}</h3>
          ${p.badge ? `<span class="badge">${p.badge}</span>` : ""}
        </div>
        <p class="ti-desc">${p.desc}</p>
        <div class="ti-meta">
          <span><svg class="meta-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>${p.duration}</span>
          <span><svg class="meta-icon meta-person" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M5 21a7 7 0 0 1 14 0Z"/></svg>${p.popularity.toLocaleString()} ครั้ง</span>
        </div>
        <button class="go-btn" data-open="${p.id}">สวดเลย <span class="circle"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7Z"/></svg></span></button>
      </div>
    </div>
  `).join("");
  dots.innerHTML = featured.map((_,i)=>`<span class="${i===0?"active":""}"></span>`).join("");

  car.querySelectorAll("[data-open]").forEach(btn=>{
    btn.addEventListener("click", ()=> openReader(btn.dataset.open));
  });

  car.addEventListener("scroll", ()=>{
    const idx = Math.round(car.scrollLeft / car.clientWidth);
    dots.querySelectorAll("span").forEach((d,i)=>d.classList.toggle("active", i===idx));
  });
}

/* ---------------- HOME: QUICK TILES ---------------- */
function renderTiles(){
  const wrap = document.getElementById("quickTiles");
  wrap.innerHTML = QUICK_TILES.map(t=>`
    <button class="tile" data-open="${t.id}">
      <img src="${t.icon}" alt="">
      <span>${t.label}</span>
    </button>
  `).join("");
  wrap.querySelectorAll("[data-open]").forEach(btn=>{
    btn.addEventListener("click", ()=> openReader(btn.dataset.open));
  });
}

/* ---------------- HOME: STREAK ---------------- */
function renderStreak(){
  const streak = computeStreak();
  document.getElementById("streakNum").textContent = streak;
  document.getElementById("goalDays").textContent = state.goal;
  document.getElementById("meritStreak").textContent = streak;

  const cheer = document.getElementById("streakCheer");
  if(streak===0) cheer.textContent = "เริ่มต้นวันนี้เลยนะคะ";
  else if(streak<7) cheer.textContent = "เก่งมากเลยค่ะ! ✨";
  else if(streak<21) cheer.textContent = "สุดยอดไปเลยค่ะ! 🔥";
  else cheer.textContent = "สม่ำเสมอสุด ๆ ค่ะ! 🏵️";

  const week = document.getElementById("streakWeek");
  const now = new Date();
  const monIdx = dowMon0(now);
  const monday = new Date(now); monday.setDate(now.getDate()-monIdx);
  const set = new Set(state.completedDates);

  let html="";
  for(let i=0;i<7;i++){
    const d = new Date(monday); d.setDate(monday.getDate()+i);
    const ds = todayStr(d);
    const isToday = ds===todayStr(now);
    const isFuture = d > now && !isToday;
    const done = set.has(ds);
    let cls = "day-badge";
    let content = "";
    if(done){ cls+=" done"; content="✓"; }
    else if(isFuture){ cls+=" future"; content=""; }
    if(isToday) cls+=" today";
    const todayAttr = isToday ? `data-today-toggle="1"` : "";
    html += `<div class="day-col"><div class="${cls}" ${todayAttr}>${content}</div><span class="day-label">${DOW_TH[i]}</span></div>`;
  }
  week.innerHTML = html;

  const todayCircle = week.querySelector('[data-today-toggle]');
  if(todayCircle) todayCircle.addEventListener("click", toggleTodayDirect);

  // manual "check in without opening the app's reader" button
  const doneToday = set.has(todayStr(now));
  const btn = document.getElementById("checkinBtn");
  const icon = document.getElementById("checkinIcon");
  const text = document.getElementById("checkinText");
  btn.classList.toggle("done", doneToday);
  icon.textContent = doneToday ? "💗" : "✅";
  text.textContent = doneToday ? "วันนี้สวดแล้วนะคะ (กดอีกครั้งเพื่อยกเลิก)" : "วันนี้สวดแล้ว ไม่ผ่านแอป กดติ๊กเลย";
}

/* ---------------- PRAYER LIBRARY ---------------- */
let activeCategory = "ทั้งหมด";
let searchTerm = "";
let activeLibraryTab = "all";
let editingPrayerSetId = null;
let editingPrayerSetDraft = [];
let editingAssistantSetId = null;
let assistantPrayerOrder = [];

function renderChips(){
  const row = document.getElementById("chipRow");
  row.innerHTML = CATEGORIES.map(c=>`<button class="chip ${c===activeCategory?"active":""}" data-cat="${c}">${c}</button>`).join("");
  row.querySelectorAll("[data-cat]").forEach(btn=>{
    btn.addEventListener("click", ()=>{ activeCategory = btn.dataset.cat; renderChips(); renderPrayerList(); });
  });
}

function renderPrayerList(){
  const list = document.getElementById("prayerList");
  let items = PRAYERS.slice().sort((a,b)=>b.popularity-a.popularity);
  if(activeCategory!=="ทั้งหมด") items = items.filter(p=>p.category===activeCategory);
  if(searchTerm.trim()) items = items.filter(p=>p.title.includes(searchTerm.trim()));

  if(items.length===0){
    list.innerHTML = `<p class="no-results">ไม่พบบทสวดที่ค้นหาค่ะ 🥲</p>`;
    return;
  }
  list.innerHTML = items.map(p=>prayerCardHTML(p)).join("");
  bindPrayerCards(list);
}

function renderMyPrayerSets(){
  const wrap = document.getElementById("myPrayerSets");
  const empty = document.getElementById("myPrayerEmpty");
  const detail = document.getElementById("myPrayerDetail");
  const sets = Array.isArray(state.customPrayerSets) ? [...state.customPrayerSets].reverse() : [];
  detail.classList.remove("open");
  wrap.style.display = sets.length ? "flex" : "none";
  empty.style.display = sets.length ? "none" : "block";
  wrap.innerHTML = sets.map(set=>`<button class="my-set-card" data-set-id="${set.id}"><span class="my-set-icon"><img src="assets/assistant-calm.png" alt=""></span><span class="my-set-copy"><b>${set.name}</b><small>${set.prayerIds.length} บท · ใช้เวลาประมาณ ${set.totalMinutes || 0} นาที</small></span><span class="my-set-arrow">›</span></button>`).join("");
  wrap.querySelectorAll("[data-set-id]").forEach(button=>button.addEventListener("click",()=>openMyPrayerSet(button.dataset.setId)));
}

function editPrayerSetInAssistant(setId){
  const set = (state.customPrayerSets || []).find(item=>String(item.id)===String(setId));
  if(!set) return;
  editingAssistantSetId = set.id;
  showScreen("assistant");
  document.querySelector('#assistantModeTabs [data-mode="prayers"]')?.click();
  document.querySelectorAll("#assistantPrayerPicker button.active").forEach(button=>button.classList.remove("active"));
  assistantPrayerOrder = [];
  set.prayerIds.forEach(prayerId=>document.querySelector(`#assistantPrayerPicker button[data-value="${prayerId}"]`)?.click());
  document.getElementById("assistantPreviewTitle").textContent = set.name;
  document.getElementById("assistantResult").classList.remove("show");
  document.getElementById("assistantCreate").innerHTML = '<span>✦</span> บันทึกการแก้ไข <small>อัปเดตชุดสวดของฉัน</small>';
}

function openMyPrayerSet(setId){
  const set = (state.customPrayerSets || []).find(item=>String(item.id)===String(setId));
  if(!set) return;
  editingPrayerSetId = set.id;
  editingPrayerSetDraft = [...set.prayerIds];
  document.getElementById("myPrayerSets").style.display = "none";
  document.getElementById("myPrayerEmpty").style.display = "none";
  document.getElementById("myPrayerDetail").classList.add("open");
  document.getElementById("myPrayerDetailTitle").textContent = set.name;
  renderMyPrayerSetEditor();
}

function renderMyPrayerSetEditor(){
  const prayers = editingPrayerSetDraft.map(findPrayer).filter(Boolean);
  document.getElementById("myPrayerDetailMeta").textContent = `${prayers.length} บท`;
  const list = document.getElementById("myPrayerDetailList");
  list.innerHTML = prayers.map((prayer,index)=>`<button class="my-prayer-item" data-open="${prayer.id}"><i>${index+1}</i><img src="${getPrayerIcon(prayer)}" alt=""><span><b>${prayer.title}</b><small>${prayer.duration}</small></span><em>›</em></button>`).join("");
  list.querySelectorAll("[data-open]").forEach(button=>button.addEventListener("click",()=>openReaderFromSet(button.dataset.open)));
}

function openReaderFromSet(prayerId){
  activeReaderSequence = editingPrayerSetDraft.map(findPrayer).filter(Boolean).map(prayer=>prayer.id);
  activeReaderSequenceIndex = activeReaderSequence.indexOf(prayerId);
  openReader(prayerId,{preserveSequence:true});
}

function deleteMyPrayerSet(setId){
  if(!confirm("ต้องการลบชุดสวดนี้ใช่ไหม?")) return;
  state.customPrayerSets = (state.customPrayerSets || []).filter(item=>String(item.id)!==String(setId));
  saveState();
  renderMyPrayerSets();
}

function setPrayerLibraryTab(tab){
  activeLibraryTab = tab;
  document.querySelectorAll("#prayerLibraryTabs button").forEach(button=>button.classList.toggle("active",button.dataset.libraryTab===tab));
  document.getElementById("allPrayersPanel").style.display = tab==="all" ? "block" : "none";
  document.getElementById("myPrayersPanel").classList.toggle("active",tab==="mine");
  if(tab==="mine") renderMyPrayerSets();
}

function prayerCardHTML(p){
  const isFav = state.favorites.includes(p.id);
  const prayerIcon = getPrayerIcon(p);
  return `
    <button class="prayer-card" data-open="${p.id}">
      <div class="pc-icon-wrap ${prayerIcon === "assets/prayer-hands.png" ? "pc-icon-hands" : ""}" style="background-image:url('${prayerIcon}')"></div>
      <div class="pc-body">
        <div class="pc-title-row">
          <h3>${p.title}</h3>
          ${p.badge ? `<span class="pc-tag">${p.badge}</span>` : ""}
        </div>
        <p class="pc-desc">${p.desc || ""}</p>
        <div class="pc-meta">
          <span class="pc-time"><svg class="meta-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>${p.duration}</span>
          <span class="pc-popularity"><svg class="meta-icon meta-person" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M5 21a7 7 0 0 1 14 0Z"/></svg>ยอดสวด ${p.popularity.toLocaleString()} ครั้ง</span>
        </div>
      </div>
      <span class="pc-actions">
        <span class="pc-fav ${isFav ? "active" : ""}" data-fav="${p.id}">${isFav ? "♥" : "♡"}</span>
        <span class="pc-play"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7Z"/></svg></span>
      </span>
    </button>
  `;
}

function bindPrayerCards(container){
  container.querySelectorAll("[data-open]").forEach(card=>{
    card.addEventListener("click", (e)=>{
      if(e.target.closest("[data-fav]")) return;
      openReader(card.dataset.open);
    });
  });
  container.querySelectorAll("[data-fav]").forEach(el=>{
    el.addEventListener("click", (e)=>{
      e.stopPropagation();
      toggleFavorite(el.dataset.fav);
    });
  });
}

function toggleFavorite(id){
  const i = state.favorites.indexOf(id);
  if(i>-1) state.favorites.splice(i,1); else state.favorites.push(id);
  saveState();
  renderPrayerList();
  renderFavList();
  renderMeritStats();
  if(currentPrayer && currentPrayer.id===id) updateFavIcon();
}

/* ---------------- MERIT SCREEN ---------------- */
function renderMeritStats(){
  const streak = computeStreak();
  document.getElementById("meritStreak").textContent = streak;
  document.getElementById("meritTotal").textContent = state.completedDates.length;
  document.getElementById("meritStreakDetail").textContent = streak;
  document.getElementById("meritFav").textContent = state.favorites.length;
  const now = new Date();
  const monday = new Date(now); monday.setDate(now.getDate()-dowMon0(now));
  const completed = new Set(state.completedDates);
  document.getElementById("meritWeek").innerHTML = DOW_TH.map((label,i)=>{
    const day = new Date(monday); day.setDate(monday.getDate()+i);
    const done = completed.has(todayStr(day));
    const future = day > now;
    return `<span class="merit-day"><b>${label}</b><i class="${done ? "done" : future ? "future" : ""}">${done ? "✓" : ""}</i></span>`;
  }).join("");
  renderPrayerHistory();
}

function renderPrayerHistory(){
  const wrap = document.getElementById("prayerHistory");
  const empty = document.getElementById("historyEmpty");
  const items = state.prayerHistory || [];
  empty.style.display = items.length ? "none" : "block";
  wrap.innerHTML = items.slice(0,8).map(item=>{
    const prayer = findPrayer(item.prayerId);
    if(!prayer) return "";
    const date = new Date(item.at);
    const dateText = date.toLocaleDateString("th-TH",{day:"numeric",month:"short",year:"numeric"});
    const timeText = date.toLocaleTimeString("th-TH",{hour:"2-digit",minute:"2-digit"});
    return `<button class="history-item" data-open="${prayer.id}"><img src="${getPrayerIcon(prayer)}" alt=""><span><b>${prayer.title}</b><small>${dateText} · ${timeText}</small></span><strong>+${item.points || 10}</strong><em>☆</em></button>`;
  }).join("");
  wrap.querySelectorAll("[data-open]").forEach(btn=>btn.addEventListener("click",()=>openReader(btn.dataset.open)));
}

function renderCalendar(){
  const cal = document.getElementById("calendar");
  const now = new Date();
  const y = now.getFullYear(), m = now.getMonth();
  const firstDow = dowMon0(new Date(y,m,1));
  const daysInMonth = new Date(y,m+1,0).getDate();
  const set = new Set(state.completedDates);

  let html = DOW_TH.map(d=>`<div class="cal-dow">${d}</div>`).join("");
  for(let i=0;i<firstDow;i++) html += `<div class="cal-day empty"></div>`;
  for(let day=1; day<=daysInMonth; day++){
    const ds = todayStr(new Date(y,m,day));
    const isToday = ds===todayStr(now);
    const done = set.has(ds);
    html += `<div class="cal-day ${done?"done":""} ${isToday?"today":""}">${day}</div>`;
  }
  cal.innerHTML = html;
}

function renderBadges(){
  const grid = document.getElementById("badgeGrid");
  const streak = computeStreak();
  const total = state.completedDates.length;
  const fav = state.favorites.length;
  grid.innerHTML = BADGES.map(b=>{
    const val = b.type==="streak"?streak : b.type==="fav"?fav : total;
    const unlocked = val>=b.need;
    return `<div class="badge-item ${unlocked?"":"locked"}">
      <span class="b-icon">${b.icon}</span>
      <span class="b-label">${b.label}</span>
    </div>`;
  }).join("");
}

function renderFavList(){
  const list = document.getElementById("favList");
  const empty = document.getElementById("favEmpty");
  const favs = PRAYERS.filter(p=>state.favorites.includes(p.id));
  if(favs.length===0){
    list.innerHTML=""; empty.style.display="block"; return;
  }
  empty.style.display="none";
  list.innerHTML = favs.map(p=>prayerCardHTML(p)).join("");
  bindPrayerCards(list);
}

/* ---------------- READER OVERLAY ---------------- */
let currentPrayer = null;
let readerTimer = null;
let currentLine = 0;
let isPlaying = false;
let activeReaderTab = "prayer";
let activeReaderSequence = [];
let activeReaderSequenceIndex = -1;
const LINE_SECONDS = 3.2;

function openReader(id,options={}){
  if(!options.preserveSequence){ activeReaderSequence=[]; activeReaderSequenceIndex=-1; }
  currentPrayer = findPrayer(id);
  if(!currentPrayer) return;
  currentLine = 0;
  isPlaying = false;
  clearInterval(readerTimer);

  document.getElementById("readerCat").textContent = currentPrayer.category;
  document.getElementById("readerTitle").textContent = currentPrayer.title;
  document.getElementById("readerImage").src = getPrayerIcon(currentPrayer);
  document.getElementById("readerPrayerHeading").textContent = currentPrayer.readerHeading || `${currentPrayer.title} (ตั้งนะโม 3 จบ)`;
  document.getElementById("readerDesc").textContent = currentPrayer.desc || "";
  document.getElementById("readerDuration").textContent = currentPrayer.duration;
  document.getElementById("readerPop").textContent = currentPrayer.popularity.toLocaleString();
  updateFavIcon();
  renderReaderLines();
  setReaderTab("prayer");
  updateProgress();
  setPlayIcon(false);
  updateReaderSetNav();

  showScreen("reader");
  document.querySelectorAll(".nav-item").forEach(b=>b.classList.remove("active"));
  document.getElementById("mainPrayerBtn").classList.add("active");
}

function updateReaderSetNav(){
  const nav = document.getElementById("readerSetNav");
  const hasSequence = activeReaderSequence.length > 0 && activeReaderSequenceIndex >= 0;
  nav.classList.toggle("open",hasSequence);
  if(!hasSequence) return;
  const previous = findPrayer(activeReaderSequence[activeReaderSequenceIndex-1]);
  const next = findPrayer(activeReaderSequence[activeReaderSequenceIndex+1]);
  document.getElementById("readerSetPosition").textContent = `${activeReaderSequenceIndex+1} / ${activeReaderSequence.length}`;
  document.getElementById("readerSetPrevName").textContent = previous?.title || "บทแรก";
  document.getElementById("readerSetNextName").textContent = next?.title || "บทสุดท้าย";
  document.getElementById("readerSetPrev").disabled = !previous;
  document.getElementById("readerSetNext").disabled = !next;
}

function navigateReaderSet(direction){
  const nextIndex = activeReaderSequenceIndex + direction;
  if(nextIndex < 0 || nextIndex >= activeReaderSequence.length) return;
  activeReaderSequenceIndex = nextIndex;
  openReader(activeReaderSequence[nextIndex],{preserveSequence:true});
}

function setReaderTab(tab){
  activeReaderTab = tab;
  document.querySelectorAll("[data-reader-tab]").forEach(btn=>{
    btn.classList.toggle("active", btn.dataset.readerTab===tab);
  });
  if(tab==="prayer"){
    renderReaderLines();
  }else if(tab==="translation"){
    document.getElementById("readerText").innerHTML = `<p class="reader-line current">${currentPrayer.desc || "ยังไม่มีคำแปลสำหรับบทสวดนี้"}</p>`;
  }else{
    document.getElementById("readerText").innerHTML = `<p class="reader-line current">ตั้งจิตให้สงบ หายใจช้า ๆ และสวดด้วยความตั้งใจ สามารถปรับขนาดตัวอักษรหรือหยุดพักได้ตามต้องการ</p>`;
  }
}

function closeReader(){
  clearInterval(readerTimer);
  isPlaying = false;
  showScreen("prayers");
}

function updateFavIcon(){
  const btn = document.getElementById("readerFav");
  btn.textContent = state.favorites.includes(currentPrayer.id) ? "♥" : "♡";
}

function renderReaderLines(){
  const wrap = document.getElementById("readerText");
  wrap.innerHTML = currentPrayer.lines.map((l,i)=>{
    let cls = "reader-line";
    const isSection = l.startsWith("## ");
    const isMeaning = l.startsWith("ความหมายโดยย่อ:") || l.startsWith("คำแนะนำ:");
    if(isSection) cls += " reader-section-title";
    if(isMeaning) cls += " reader-meaning";
    if(i<currentLine) cls+=" past";
    if(i===currentLine) cls+=" current";
    return `<p class="${cls}" data-line="${i}">${isSection ? l.slice(3) : l}</p>`;
  }).join("");
  const cur = wrap.querySelector(".current");
  if(cur) cur.scrollIntoView({block:"center", behavior:"smooth"});
}

function updateProgress(){
  const pct = currentPrayer.lines.length<=1 ? 100 : Math.round((currentLine/(currentPrayer.lines.length-1))*100);
  document.getElementById("readerProgressBar").style.width = pct+"%";
}

function setPlayIcon(playing){
  document.getElementById("playIcon").style.display = playing?"none":"block";
  document.getElementById("pauseIcon").style.display = playing?"block":"none";
}

function togglePlay(){
  isPlaying = !isPlaying;
  setPlayIcon(isPlaying);
  if(isPlaying){
    playChime(660);
    readerTimer = setInterval(()=>{
      if(currentLine < currentPrayer.lines.length-1){
        currentLine++;
        if(activeReaderTab==="prayer") renderReaderLines();
        updateProgress();
      } else {
        clearInterval(readerTimer);
        isPlaying=false;
        setPlayIcon(false);
        markComplete();
      }
    }, LINE_SECONDS*1000);
  } else {
    clearInterval(readerTimer);
  }
}

function restartReader(){
  currentLine = 0;
  isPlaying = false;
  clearInterval(readerTimer);
  setPlayIcon(false);
  renderReaderLines();
  updateProgress();
}

function stepReader(direction){
  currentLine = Math.max(0, Math.min(currentPrayer.lines.length-1, currentLine+direction));
  if(activeReaderTab!=="prayer") setReaderTab("prayer");
  else renderReaderLines();
  updateProgress();
}

// for people who chanted offline (book, other app, in person) and just want
// to check today off without going through the in-app reader/play flow
function toggleTodayDirect(){
  const ds = todayStr();
  const already = state.completedDates.includes(ds);

  if(already){
    state.completedDates = state.completedDates.filter(d=>d!==ds);
    saveState();
    renderStreak();
    renderMeritStats();
    renderCalendar();
    renderBadges();
    return;
  }

  state.completedDates.push(ds);
  saveState();
  renderStreak();
  renderMeritStats();
  renderCalendar();
  renderBadges();
  playChime(880);
  spawnBurst();
  document.getElementById("completeMsg").textContent =
    `บันทึกแล้วค่ะว่าวันนี้สวดมนต์แล้ว วันนี้ครบ ${computeStreak()} วันติดต่อกันค่ะ`;
  document.getElementById("completeModal").classList.add("open");
}

function markComplete(){
  const ds = todayStr();
  const already = state.completedDates.includes(ds);
  if(!already){
    state.completedDates.push(ds);
    saveState();
  }
  state.prayerHistory = state.prayerHistory || [];
  state.prayerHistory.unshift({prayerId:currentPrayer.id,at:new Date().toISOString(),points:10});
  state.prayerHistory = state.prayerHistory.slice(0,50);
  saveState();
  renderStreak();
  renderMeritStats();
  renderCalendar();
  renderBadges();
  playChime(880);
  spawnBurst();
  document.getElementById("completeMsg").textContent = already
    ? `วันนี้สวดครบแล้วอีกรอบ อนุโมทนาบุญด้วยนะคะ 🌸`
    : `สวดครบ “${currentPrayer.title}” แล้ว วันนี้ครบ ${computeStreak()} วันติดต่อกันค่ะ`;
  document.getElementById("completeModal").classList.add("open");
}

/* ---------------- SPARKLE BURST + CHIME ---------------- */
function spawnBurst(){
  const emojis=["✨","🌸","💗","⭐","🪷"];
  const cx = window.innerWidth/2, cy = window.innerHeight/2;
  for(let i=0;i<14;i++){
    const el = document.createElement("span");
    el.className="burst-emoji";
    el.textContent = emojis[Math.floor(Math.random()*emojis.length)];
    const angle = Math.random()*Math.PI*2;
    const dist = 80+Math.random()*120;
    el.style.left = cx+"px"; el.style.top = cy+"px";
    el.style.setProperty("--dx", Math.cos(angle)*dist+"px");
    el.style.setProperty("--dy", Math.sin(angle)*dist+"px");
    document.body.appendChild(el);
    setTimeout(()=>el.remove(), 1000);
  }
}

let audioCtx;
function playChime(freq){
  try{
    audioCtx = audioCtx || new (window.AudioContext||window.webkitAudioContext)();
    const o = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    o.type="sine"; o.frequency.value=freq;
    g.gain.setValueAtTime(0.0001, audioCtx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.12, audioCtx.currentTime+0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime+1.1);
    o.connect(g); g.connect(audioCtx.destination);
    o.start(); o.stop(audioCtx.currentTime+1.1);
  }catch(e){}
}

/* ---------------- NAV / SCREENS ---------------- */
function showScreen(name){
  clearInterval(readerTimer);
  isPlaying = false;
  document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
  document.getElementById("screen-"+name).classList.add("active");
  document.querySelectorAll(".nav-item").forEach(b=>b.classList.remove("active"));
  document.querySelectorAll(`.nav-item[data-nav="${name}"]`).forEach(b=>b.classList.add("active"));
  window.scrollTo({top:0, behavior:"smooth"});

  if(name==="merit"){ renderMeritStats(); renderCalendar(); renderBadges(); renderFavList(); }
  if(name==="prayers") setPrayerLibraryTab(activeLibraryTab);
  if(name==="assistant") document.getElementById("assistantResult")?.classList.remove("show");
}

/* ---------------- SETTINGS ---------------- */
function applyFontSize(size){
  [document.documentElement,document.body].forEach(el=>{
    el.classList.remove("font-small","font-large");
    if(size==="small") el.classList.add("font-small");
    if(size==="large") el.classList.add("font-large");
  });
}

function applyTheme(theme){
  document.body.classList.remove("theme-pink","theme-yellow","theme-mint");
  if(theme!=="purple") document.body.classList.add(`theme-${theme}`);
  document.querySelectorAll("#themeOptions button").forEach(btn=>btn.classList.toggle("active", btn.dataset.theme===theme));
}

function initSettings(){
  state.theme = state.theme || "purple";
  applyTheme(state.theme);
  document.querySelectorAll("#themeOptions button").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      state.theme = btn.dataset.theme;
      saveState();
      applyTheme(state.theme);
    });
  });
  document.querySelectorAll("#fontSizeOptions button").forEach(btn=>{
    if(btn.dataset.size===state.fontSize) btn.classList.add("active"); else btn.classList.remove("active");
    btn.addEventListener("click", ()=>{
      state.fontSize = btn.dataset.size; saveState();
      document.querySelectorAll("#fontSizeOptions button").forEach(b=>b.classList.toggle("active", b===btn));
      applyFontSize(state.fontSize);
    });
  });
  applyFontSize(state.fontSize);

  const profileNameInput = document.getElementById("profileNameInput");
  const profileMessageInput = document.getElementById("profileMessageInput");
  let pendingProfileTheme = state.profileTheme || "pink";
  const applyProfileImages = (gender,profileTheme=pendingProfileTheme)=>{
    const isMale = gender === "ชาย";
    const themeImages = {
      pink:{female:"assets/hero-pink-female.png",male:"assets/hero-pink-male.png"},
      purple:{female:"assets/hero-purple-female.png",male:"assets/hero-purple-male.png"},
      blue:{female:"assets/hero-blue-female.png",male:"assets/hero-blue-male.png"},
      green:{female:"assets/hero-green-female.png",male:"assets/hero-green-male.png"}
    };
    const selectedImages = themeImages[profileTheme] || themeImages.pink;
    document.querySelectorAll("[data-profile-avatar]").forEach(image=>image.src=isMale ? "assets/profile-male.png" : "assets/profile-female.png");
    document.querySelectorAll("[data-gender-hero]").forEach(image=>image.src=isMale ? selectedImages.male : selectedImages.female);
    document.querySelectorAll("#profileThemeOptions button").forEach(button=>button.classList.toggle("active",button.dataset.profileTheme===profileTheme));
  };
  const renderProfileSetting = ()=>{
    document.getElementById("settingsProfileName").textContent = state.profileName || "แก้ไขโปรไฟล์";
    document.getElementById("settingsProfileMessage").textContent = state.profileMessage || "เพิ่มชื่อและข้อความทักทายของคุณ";
    document.getElementById("profileDisplayName").textContent = [state.profileFirstName,state.profileLastName].filter(Boolean).join(" ") || state.profileName || "เมตตา มณีจันทร์";
    document.getElementById("profileDisplayBio").textContent = state.profileMessage || "ขอให้ทุกวันเป็นวันที่ใจสงบ 💗";
    const meritPoints = (state.prayerHistory || []).reduce((total,item)=>total+(Number(item.points) || 10),0);
    document.getElementById("profileLevel").textContent = `Level ${Math.floor(meritPoints / 100) + 1}`;
    document.getElementById("profilePoints").textContent = meritPoints.toLocaleString("th-TH");
    document.getElementById("profileStreak").textContent = `${computeStreak()} วัน`;
    pendingProfileTheme = state.profileTheme || "pink";
    applyProfileImages(state.profileGender || "หญิง",pendingProfileTheme);
  };
  renderProfileSetting();
  document.getElementById("editProfileBtn").addEventListener("click",()=>{
    renderProfileSetting(); document.querySelector(".profile-menu").style.display="block"; document.getElementById("profileInlineEdit").classList.remove("open"); showScreen("profile");
  });
  document.getElementById("personalInfoBtn").addEventListener("click",()=>{
    document.getElementById("profileFirstName").value=state.profileFirstName||""; document.getElementById("profileLastName").value=state.profileLastName||""; profileNameInput.value=state.profileName||""; profileMessageInput.value=state.profileMessage||""; document.getElementById("profileBirthDate").value=state.profileBirthDate||""; document.getElementById("profileEmail").value=state.profileEmail||"";
    pendingProfileTheme=state.profileTheme||"pink"; document.querySelectorAll('[name="profileGender"]').forEach(input=>input.checked=input.value===(state.profileGender||"หญิง")); applyProfileImages(state.profileGender||"หญิง",pendingProfileTheme); document.querySelector(".profile-menu").style.display="none"; document.getElementById("profileInlineEdit").classList.add("open");
  });
  document.getElementById("profileEditBack").addEventListener("click",()=>{ pendingProfileTheme=state.profileTheme||"pink"; applyProfileImages(state.profileGender||"หญิง",pendingProfileTheme); document.getElementById("profileInlineEdit").classList.remove("open"); document.querySelector(".profile-menu").style.display="block"; });
  document.querySelectorAll('[name="profileGender"]').forEach(input=>input.addEventListener("change",()=>applyProfileImages(input.value,pendingProfileTheme)));
  document.querySelectorAll("#profileThemeOptions button").forEach(button=>button.addEventListener("click",()=>{ pendingProfileTheme=button.dataset.profileTheme; applyProfileImages(document.querySelector('[name="profileGender"]:checked')?.value||state.profileGender||"หญิง",pendingProfileTheme); }));
  document.getElementById("profileForm").addEventListener("submit",event=>{
    event.preventDefault();
    state.profileName = profileNameInput.value.trim();
    state.profileMessage = profileMessageInput.value.trim();
    state.profileFirstName=document.getElementById("profileFirstName").value.trim(); state.profileLastName=document.getElementById("profileLastName").value.trim(); state.profileGender=document.querySelector('[name="profileGender"]:checked')?.value||"หญิง"; state.profileTheme=pendingProfileTheme; state.profileBirthDate=document.getElementById("profileBirthDate").value; state.profileEmail=document.getElementById("profileEmail").value.trim();
    saveState();
    renderProfileSetting();
    renderHero();
    document.getElementById("profileInlineEdit").classList.remove("open"); document.querySelector(".profile-menu").style.display="block";
  });

  document.querySelectorAll("#goalOptions button").forEach(btn=>{
    if(Number(btn.dataset.goal)===state.goal) btn.classList.add("active"); else btn.classList.remove("active");
    btn.addEventListener("click", ()=>{
      state.goal = Number(btn.dataset.goal); saveState();
      document.getElementById("goalValue").textContent = `${state.goal} วัน`;
      document.querySelectorAll("#goalOptions button").forEach(b=>b.classList.toggle("active", b===btn));
      renderStreak();
    });
  });
  document.getElementById("goalValue").textContent = `${state.goal} วัน`;

  const toggle = document.getElementById("reminderToggle");
  const timeInput = document.getElementById("reminderTime");
  const timePickerModal = document.getElementById("timePickerModal");
  const timeHour = document.getElementById("timeHour");
  const timeMinute = document.getElementById("timeMinute");
  const selectedTime = document.getElementById("selectedTime");
  toggle.checked = state.reminderOn;
  timeInput.value = state.reminderTime;
  selectedTime.textContent = state.reminderTime;
  timeHour.innerHTML = Array.from({length:24},(_,i)=>`<option value="${String(i).padStart(2,"0")}">${String(i).padStart(2,"0")}</option>`).join("");
  timeMinute.innerHTML = Array.from({length:60},(_,i)=>`<option value="${String(i).padStart(2,"0")}">${String(i).padStart(2,"0")}</option>`).join("");
  document.getElementById("timePickerBtn").addEventListener("click", ()=>{
    const [hour,minute] = timeInput.value.split(":");
    timeHour.value = hour; timeMinute.value = minute;
    timePickerModal.classList.add("open");
  });
  document.getElementById("timePickerCancel").addEventListener("click", ()=>timePickerModal.classList.remove("open"));
  document.getElementById("timePickerSave").addEventListener("click", ()=>{
    state.reminderTime = `${timeHour.value}:${timeMinute.value}`;
    timeInput.value = state.reminderTime;
    selectedTime.textContent = state.reminderTime;
    saveState();
    timePickerModal.classList.remove("open");
  });
  timePickerModal.addEventListener("click", e=>{if(e.target===timePickerModal) timePickerModal.classList.remove("open");});
  toggle.addEventListener("change", ()=>{
    state.reminderOn = toggle.checked; saveState();
  });

  document.getElementById("resetBtn").addEventListener("click", ()=>{
    if(confirm("ล้างข้อมูลการสวดมนต์ทั้งหมดใช่ไหมคะ? การกระทำนี้ย้อนกลับไม่ได้")){
      state = {...DEFAULT_STATE,completedDates:[],favorites:[],prayerHistory:[],customPrayerSets:[]};
      saveState();
      applyTheme(state.theme);
      applyFontSize(state.fontSize);
      renderAll();
      showScreen("home");
    }
  });
}

/* ---------------- BIND EVENTS ---------------- */
function bindNav(){
  document.querySelectorAll(".nav-item").forEach(btn=>{
    if(btn.dataset.nav) btn.addEventListener("click", ()=> showScreen(btn.dataset.nav));
  });
  document.querySelectorAll("[data-nav]").forEach(el=>{
    if(!el.classList.contains("nav-item")){
      el.addEventListener("click", ()=>{
        showScreen(el.dataset.nav);
        if(el.dataset.scrollTarget){
          setTimeout(()=>document.getElementById(el.dataset.scrollTarget)?.scrollIntoView({behavior:"smooth",block:"start"}),250);
        }
      });
    }
  });
  document.getElementById("mainPrayerBtn").addEventListener("click", ()=>{
    openReader("jinapanjara");
  });
}

function bindReaderControls(){
  const continuousToggle = document.getElementById("continuousToggle");
  continuousToggle.checked = Boolean(state.continuousOn);
  continuousToggle.addEventListener("change", ()=>{
    state.continuousOn = continuousToggle.checked;
    saveState();
  });
  document.querySelectorAll("[data-reader-tab]").forEach(btn=>{
    btn.addEventListener("click", ()=> setReaderTab(btn.dataset.readerTab));
  });
  document.getElementById("readerPlay").addEventListener("click", togglePlay);
  document.getElementById("readerRestart").addEventListener("click", restartReader);
  document.getElementById("readerPrev").addEventListener("click", ()=> stepReader(-1));
  document.getElementById("readerNext").addEventListener("click", ()=> stepReader(1));
  document.getElementById("readerSetPrev").addEventListener("click",()=>navigateReaderSet(-1));
  document.getElementById("readerSetNext").addEventListener("click",()=>navigateReaderSet(1));
  document.getElementById("readerDone").addEventListener("click", ()=> stepReader(1));
  document.getElementById("readerFav").addEventListener("click", ()=> toggleFavorite(currentPrayer.id));
  document.getElementById("completeClose").addEventListener("click", ()=>{
    document.getElementById("completeModal").classList.remove("open");
    closeReader();
  });
}

function bindSearch(){
  document.getElementById("searchInput").addEventListener("input", (e)=>{
    searchTerm = e.target.value;
    renderPrayerList();
  });
}

function bindBell(){
  document.getElementById("bellBtn").addEventListener("click", ()=>{
    const isSettingsOpen = document.getElementById("screen-settings").classList.contains("active");
    showScreen(isSettingsOpen ? "home" : "settings");
  });
}

function bindCheckin(){
  document.getElementById("checkinBtn").addEventListener("click", toggleTodayDirect);
}

function bindAssistant(){
  let assistantMode = "focus";
  const focusRecommendations = {
    "เงินและโชคลาภ":["millionaire-mantra","sivali-worship","lakshmi-worship"],
    "งานและความสำเร็จ":["maha-chakraphat","wish","ratanattaya-praise"],
    "ความรักและเมตตา":["metta-self","karaniya-metta-sutta","merit-dedication"],
    "ใจสงบผ่อนคลาย":["karaniya-metta-sutta","metta-self","bedtime-prayer"],
    "คุ้มครองปกป้อง":["bahum-mahaka","vesavana-worship","jinapanjara-full"],
    "สุขภาพสิริมงคล":["ratanattaya-praise","bahum-mahaka","merit-dedication"],
    "ก่อนนอนหลับสบาย":["bedtime-prayer","metta-self","merit-dedication"],
    "เริ่มต้นวันใหม่":["namotassa","ratanattaya-praise","maha-chakraphat"]
  };
  const picker = document.getElementById("assistantPrayerPicker");
  const searchWrap = document.getElementById("assistantPrayerSearchWrap");
  const searchInput = document.getElementById("assistantPrayerSearch");
  const assistantReminder = document.getElementById("assistantReminder");
  const assistantContinuous = document.getElementById("assistantContinuous");
  picker.innerHTML = PRAYERS.filter(prayer=>prayer.id!=="popular").map(prayer=>`<button data-value="${prayer.id}"><img src="${getPrayerIcon(prayer)}" alt=""><b>${prayer.title}</b><i>✓</i></button>`).join("");
  assistantReminder.classList.toggle("active",Boolean(state.reminderOn));
  assistantReminder.setAttribute("aria-pressed",String(Boolean(state.reminderOn)));
  document.getElementById("assistantReminderText").textContent = `ทุกวัน ${state.reminderTime || "19:00"} น.`;
  assistantContinuous.checked = Boolean(state.continuousOn);

  let assistantFocusOrder = [...document.querySelectorAll('[data-assistant-group="focus"] .active')].map(item=>item.dataset.value);
  let assistantFocusPrayerOrder = [];
  const selectedFocuses = ()=>assistantFocusOrder.filter(value=>document.querySelector(`[data-assistant-group="focus"] button[data-value="${value}"]`)?.classList.contains("active"));
  const selectedPrayers = ()=>{
    if(assistantMode==="prayers") return assistantPrayerOrder.filter(id=>picker.querySelector(`button[data-value="${id}"]`)?.classList.contains("active")).map(findPrayer).filter(Boolean);
    const ids = [...new Set(selectedFocuses().flatMap(focus=>focusRecommendations[focus] || []))];
    assistantFocusPrayerOrder = [...assistantFocusPrayerOrder.filter(id=>ids.includes(id)),...ids.filter(id=>!assistantFocusPrayerOrder.includes(id))];
    return assistantFocusPrayerOrder.map(findPrayer).filter(Boolean);
  };
  const refreshAssistantPreview = ()=>{
    const prayers = selectedPrayers();
    const focuses = selectedFocuses();
    const time = document.querySelector('[data-assistant-group="time"] .active')?.dataset.value || "ช่วงที่สะดวก";
    const totalMinutes = prayers.reduce((sum,prayer)=>sum+(Number.parseInt(prayer.duration,10) || 0),0);
    const editingSet = (state.customPrayerSets || []).find(item=>String(item.id)===String(editingAssistantSetId));
    const focusTitle = {
      "เงินและโชคลาภ":"เงิน",
      "งานและความสำเร็จ":"งาน",
      "ความรักและเมตตา":"ความรัก",
      "ใจสงบผ่อนคลาย":"ใจสงบ",
      "คุ้มครองปกป้อง":"คุ้มครอง",
      "สุขภาพสิริมงคล":"สุขภาพ",
      "ก่อนนอนหลับสบาย":"ก่อนนอน",
      "เริ่มต้นวันใหม่":"เริ่มวันใหม่"
    };
    const title = assistantMode==="prayers" ? (editingSet?.name || time) : focuses.length>1 ? `ชุดสวด ${focuses.length} เป้าหมาย – ${time}` : `ชุดสวด${focusTitle[focuses[0]] || "สิริมงคล"} – ${time}`;
    document.getElementById("assistantPreviewTitle").textContent = title;
    document.getElementById("assistantPreviewDuration").textContent = prayers.length ? `ใช้เวลาประมาณ ${totalMinutes} นาที` : "ยังไม่ได้เลือกบทสวด";
    const prayerList = document.getElementById("assistantPrayerList");
    prayerList.innerHTML = prayers.length ? prayers.map((prayer,index)=>`<li class="sortable" data-prayer-id="${prayer.id}" draggable="true"><span>${index+1}</span><b class="assistant-prayer-name">${prayer.title}</b><small>${prayer.duration}</small><i class="assistant-drag-handle" aria-label="ลากเพื่อเรียงลำดับ">⠿</i></li>`).join("") : '<li class="assistant-empty">เลือกบทสวดเพื่อเพิ่มลงในชุด</li>';
    bindAssistantPreviewSorting(prayerList);
  };

  const syncPrayerOrderFromPreview = list=>{
    const reorderedIds = [...list.querySelectorAll("li[data-prayer-id]")].map(item=>item.dataset.prayerId);
    if(assistantMode==="prayers") assistantPrayerOrder = reorderedIds;
    else assistantFocusPrayerOrder = reorderedIds;
    refreshAssistantPreview();
  };
  const bindAssistantPreviewSorting = list=>{
    let draggedItem = null;
    list.querySelectorAll("li.sortable").forEach(item=>{
      item.addEventListener("dragstart",event=>{ draggedItem=item; item.classList.add("dragging"); event.dataTransfer.effectAllowed="move"; });
      item.addEventListener("dragover",event=>{ event.preventDefault(); if(!draggedItem || draggedItem===item) return; const rect=item.getBoundingClientRect(); list.insertBefore(draggedItem,event.clientY < rect.top+rect.height/2 ? item : item.nextSibling); });
      item.addEventListener("dragend",()=>{ if(!draggedItem) return; draggedItem.classList.remove("dragging"); draggedItem=null; syncPrayerOrderFromPreview(list); });
      const handle = item.querySelector(".assistant-drag-handle");
      handle?.addEventListener("pointerdown",event=>{ if(event.pointerType==="mouse") return; draggedItem=item; item.classList.add("dragging"); handle.setPointerCapture(event.pointerId); event.preventDefault(); });
      handle?.addEventListener("pointermove",event=>{ if(!draggedItem) return; const target=document.elementFromPoint(event.clientX,event.clientY)?.closest("li[data-prayer-id]"); if(!target || target===draggedItem || target.parentElement!==list) return; const rect=target.getBoundingClientRect(); list.insertBefore(draggedItem,event.clientY < rect.top+rect.height/2 ? target : target.nextSibling); });
      const finishPointerDrag = event=>{ if(!draggedItem) return; if(handle.hasPointerCapture(event.pointerId)) handle.releasePointerCapture(event.pointerId); draggedItem.classList.remove("dragging"); draggedItem=null; syncPrayerOrderFromPreview(list); };
      handle?.addEventListener("pointerup",finishPointerDrag);
      handle?.addEventListener("pointercancel",finishPointerDrag);
    });
  };

  document.querySelectorAll("[data-assistant-group]").forEach(group=>{
    group.querySelectorAll("button").forEach(button=>button.addEventListener("click", ()=>{
      if(group.dataset.multiple==="true"){
        button.classList.toggle("active");
        if(group.dataset.assistantGroup==="prayers"){
          if(button.classList.contains("active")){ if(!assistantPrayerOrder.includes(button.dataset.value)) assistantPrayerOrder.push(button.dataset.value); }
          else assistantPrayerOrder = assistantPrayerOrder.filter(id=>id!==button.dataset.value);
        }
        if(group.dataset.assistantGroup==="focus"){
          if(button.classList.contains("active")){ if(!assistantFocusOrder.includes(button.dataset.value)) assistantFocusOrder.push(button.dataset.value); }
          else assistantFocusOrder = assistantFocusOrder.filter(value=>value!==button.dataset.value);
        }
      }
      else{
        group.querySelectorAll("button").forEach(item=>item.classList.remove("active"));
        button.classList.add("active");
      }
      refreshAssistantPreview();
    }));
  });
  document.querySelectorAll("#assistantModeTabs button").forEach(button=>button.addEventListener("click", ()=>{
    assistantMode = button.dataset.mode;
    document.querySelectorAll("#assistantModeTabs button").forEach(item=>item.classList.toggle("active",item===button));
    document.querySelector('[data-assistant-group="focus"]').style.display = assistantMode==="focus" ? "grid" : "none";
    picker.classList.toggle("open",assistantMode==="prayers");
    searchWrap.classList.toggle("open",assistantMode==="prayers");
    document.getElementById("assistantModeTitle").textContent = assistantMode==="focus" ? "เลือกสิ่งที่คุณอยากโฟกัสในช่วงนี้ (เลือกได้หลายข้อ)" : "เลือกบทสวดที่ต้องการเพิ่มในชุด (เลือกได้หลายบท)";
    refreshAssistantPreview();
  }));
  searchInput.addEventListener("input",()=>{
    const query = searchInput.value.trim().toLocaleLowerCase("th");
    picker.querySelectorAll("button").forEach(button=>{
      const prayer = findPrayer(button.dataset.value);
      const haystack = `${prayer?.title || ""} ${prayer?.category || ""} ${prayer?.desc || ""}`.toLocaleLowerCase("th");
      button.hidden = Boolean(query) && !haystack.includes(query);
    });
  });
  assistantReminder.addEventListener("click",()=>{
    state.reminderOn = !state.reminderOn;
    assistantReminder.classList.toggle("active",state.reminderOn);
    assistantReminder.setAttribute("aria-pressed",String(state.reminderOn));
    const settingsToggle = document.getElementById("reminderToggle");
    if(settingsToggle) settingsToggle.checked = state.reminderOn;
    saveState();
  });
  assistantContinuous.addEventListener("change",()=>{
    state.continuousOn = assistantContinuous.checked;
    const readerToggle = document.getElementById("continuousToggle");
    if(readerToggle) readerToggle.checked = state.continuousOn;
    saveState();
  });
  document.getElementById("assistantCreate").addEventListener("click", ()=>{
    const prayers = selectedPrayers();
    const result = document.getElementById("assistantResult");
    if(prayers.length){
      if(!Array.isArray(state.customPrayerSets)) state.customPrayerSets=[];
      const existingSet = state.customPrayerSets.find(item=>String(item.id)===String(editingAssistantSetId));
      if(existingSet){
        existingSet.prayerIds = prayers.map(prayer=>prayer.id);
        existingSet.totalMinutes = prayers.reduce((sum,prayer)=>sum+(Number.parseInt(prayer.duration,10) || 0),0);
        existingSet.updatedAt = new Date().toISOString();
      }else{
        state.customPrayerSets.push({
          id:Date.now(),
          name:document.getElementById("assistantPreviewTitle").textContent,
          prayerIds:prayers.map(prayer=>prayer.id),
          totalMinutes:prayers.reduce((sum,prayer)=>sum+(Number.parseInt(prayer.duration,10) || 0),0),
          createdAt:new Date().toISOString()
        });
      }
      saveState();
      renderMyPrayerSets();
      result.textContent = existingSet ? `✨ อัปเดตชุดสวด ${prayers.length} บทเรียบร้อยแล้ว` : `✨ บันทึกชุดสวด ${prayers.length} บทแล้ว ดูได้ที่ บทสวด > บทสวดของฉัน`;
      editingAssistantSetId = null;
      document.getElementById("assistantCreate").innerHTML = '<span>✦</span> สร้างชุดสวดของฉัน <small>เริ่มต้นสวดได้ทันที</small>';
      document.querySelectorAll('[data-assistant-group="focus"] button.active').forEach(button=>button.classList.remove("active"));
      assistantFocusOrder = [];
      assistantFocusPrayerOrder = [];
      picker.querySelectorAll("button.active").forEach(button=>button.classList.remove("active"));
      assistantPrayerOrder = [];
      searchInput.value = "";
      picker.querySelectorAll("button").forEach(button=>button.hidden=false);
      refreshAssistantPreview();
      setPrayerLibraryTab("mine");
      showScreen("prayers");
    }else result.textContent = "กรุณาเลือกเป้าหมายหรือบทสวดอย่างน้อย 1 รายการค่ะ";
    result.classList.add("show");
  });
  refreshAssistantPreview();
}

function bindPrayerLibrary(){
  document.querySelectorAll("#prayerLibraryTabs button").forEach(button=>button.addEventListener("click",()=>setPrayerLibraryTab(button.dataset.libraryTab)));
  document.getElementById("myPrayerBack").addEventListener("click",renderMyPrayerSets);
  document.getElementById("myPrayerDeleteSet").addEventListener("click",()=>deleteMyPrayerSet(editingPrayerSetId));
  document.getElementById("myPrayerEditSet").addEventListener("click",()=>editPrayerSetInAssistant(editingPrayerSetId));
}

/* ---------------- INIT ---------------- */
function renderAll(){
  renderHero();
  renderCarousel();
  renderTiles();
  renderStreak();
  renderChips();
  renderPrayerList();
  renderMeritStats();
  renderCalendar();
  renderBadges();
  renderFavList();
}

document.addEventListener("DOMContentLoaded", ()=>{
  renderAll();
  bindNav();
  bindReaderControls();
  bindSearch();
  bindBell();
  bindCheckin();
  bindAssistant();
  bindPrayerLibrary();
  initSettings();
});
