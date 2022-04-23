const mongoose = require('mongoose')
const Schema = mongoose.Schema

const phimSchema = new Schema({
    maPhim:{
        type: Number
    },
    tenPhim:{
        type: String
    },
    biDanh:{
        type: String
    },
    moTa: {
        type: String
    },
    maNhom:{
        type: String
    },
    trailer: {
        type: String
    },
    hinhAnh: {
        type: String
    },
    maNhom:{
        type: String
    },
    ngayKhoiChieu:{
        type: Date
    },
    danhGia:{
        type: Number
    },
    sapChieu:{
        type: Boolean
    },
    dangChieu:{
        type: Boolean
    },
    hot:{
        type: Boolean
    },
    // heThongRapChieu:[
    //     {
    //         cumRapChieu:[
    //             {
    //                 lichChieuPhim:[
    //                     {
    //                         type: mongoose.Schema.Types.ObjectId,
    //                         ref: 'lichchieu'
    //                     }
    //                 ],
    //                 type: mongoose.SchemaTypes.ObjectId,
    //                 ref: 'CumRap'
    //             }
    //         ],
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'hethongrap'
    //     }
    // ],
    heThongRapChieu:[
        {
          cumRapChieu: [
            {
              lichChieuPhim: [
                {
                  maLichChieu: {type: String},
                  maRap: {type: Number},
                  tenRap: {type: String},
                  ngayChieuGioChieu:{type: Date},
                  giaVe:{type: Number},
                  thoiLuong: {type: Number}
                }
              ],
              maCumRap: {type: String},
              tenCumRap: {type: String},
              hinhAnh: {type: String},
              diaChi: {type: String}
            }],
          maHeThongRap: {type: String},
          tenHeThongRap: {type: String},
          logo: {type: String}
        }
      ],
    image:{
        type: String
    },
    img:{
        type: Buffer
    },
    imgType: {
        type: String
    }
}, {timestamps: true})

const Phim = mongoose.model('phim', phimSchema)

module.exports = Phim
