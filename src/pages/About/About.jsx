import React, { useContext } from "react";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { DataContexts } from "../../AppContexts/Contexts";
import QuestionBox from "./QuestionBox";
import lap from "../../assets/images/17068.jpg";
import back from '../../assets/images/accessory-300.png'
import tab from '../../assets/images/about2.png'

const Introduce = () => {
  const { users, products, manufacturers } = useContext(DataContexts)
  return (
    <div className="w-full h-auto flex flex-col items-center gap-[150px] py-5 pb-20 overflow-hidden mb-20">
      <div className="w-11/12">
        <div className="w-2/3">
          <Breadcrumb pageName={"Về chúng tôi"} />
        </div>
        <div className="w-full flex flex-col gap-[150px] mt-10">
          <div className="w-full flex flex-col lg:flex-row gap-10 items-center lg:items-start xl:items-center">
            <div className="w-full lg:w-1/2">
              <p className="text-5xl font-black mb-5 text-[#1677ff]">
                Về chúng tôi
              </p>
              <p className="text-[17px] md:text-lg ">
                <span className="font-black text-[#3e3e3e]">TnTech</span>{" "}
                tự hào là cửa hàng thương mại điện tử hàng đầu,
                chuyên cung cấp các sản phẩm laptop,
                điện thoại và phụ kiện điện tử chất lượng cao,
                đáp ứng mọi nhu cầu và phong cách sống của khách hàng.
                Với sứ mệnh mang đến trải nghiệm mua sắm công nghệ tiện lợi
                và đáng tin cậy, TnTech không ngừng nỗ lực xây dựng một thương
                hiệu uy tín, kết nối đam mê công nghệ với sự tiện ích trong cuộc
                sống hiện đại. <br /> <br />
                Tại <span className="font-black text-[#3e3e3e]">TnTech</span>{" "} chúng tôi cung cấp đa dạng các dòng sản phẩm:
                từ Laptop hiệu năng mạnh mẽ phục vụ công việc và học tập,
                điện thoại thông minh với thiết kế thời thượng,
                đến các phụ kiện điện tử như tai nghe, bàn phím, chuột và sạc dự phòng.
                Tất cả sản phẩm đều được tuyển chọn kỹ lưỡng từ những thương hiệu nổi
                tiếng, đảm bảo chất lượng cao, thiết kế hiện đại và mức giá hợp lý.
                Chúng tôi không chỉ mang đến các sản phẩm công nghệ mà còn cam kết
                cung cấp dịch vụ khách hàng tận tâm, chính sách bảo hành
                và đổi trả linh hoạt, cùng hệ thống giao hàng nhanh chóng
                trên toàn quốc. <br /> <br />
                Hãy để <span className="font-black text-[#3e3e3e]">TnTech</span>{" "}
                đồng hành cùng bạn, chinh phục
                mọi mục tiêu với những giải pháp công nghệ tiên tiến và đẳng cấp!
                <span className="font-black text-[#3e3e3e]">TnTech</span>{" "}
                đồng hành cùng bạn, bước qua mọi chặng đường với phong cách và
                sự tự tin!
              </p>
              <div className="w-full grid grid-cols-3 lg:gap-7 mt-5">
                <div className="flex flex-col gap-3 items-center md:items-start">
                  <p className="text-4xl sm:text-5xl font-bold text-green-700">
                    {products.length}+
                  </p>
                  <p className="font-bold text-sm sm:text-base">
                    Sản phẩm chất lượng
                  </p>
                </div>
                <div className="flex flex-col gap-3 items-center md:items-start">
                  <p className="text-4xl sm:text-5xl font-bold text-yellow-500">
                    {users.length}+
                  </p>
                  <p className="font-bold text-sm sm:text-base">Khách hàng</p>
                </div>
                <div className="flex flex-col gap-3 items-center md:items-start">
                  <p className="text-4xl sm:text-5xl font-bold text-red-500">
                    {manufacturers.length}+
                  </p>
                  <p className="font-bold text-sm sm:text-base">
                    Nhãn hàng
                  </p>
                </div>
              </div>
            </div>
            <img
              src={lap}
              className="w-full lg:w-5/12 rounded-xl shadow-2xl"
            />
          </div>
          <div className="w-full flex flex-col lg:flex-row-reverse gap-10 items-center lg:items-start xl:items-center">
            <div className="w-full lg:w-1/2">
              <p className="text-5xl font-black mb-5 text-[#1677ff]">
                Tầm nhìn và{" "}
                <span className="block sm:inline-block">sứ mệnh</span>
              </p>
              <p className="text-[17px] md:text-lg ">
                <span className="font-black text-[#3e3e3e]">TnTech</span>{" "}
                hoạt động với sứ mệnh cao cả là mang đến cho khách hàng
                những sản phẩm công nghệ hiện đại, từ laptop, điện thoại thông minh
                đến phụ kiện điện tử, giúp nâng cao trải nghiệm cuộc sống và
                khẳng định phong cách cá nhân trong kỷ nguyên số. <br /> <br />
                <span className="font-black text-[#3e3e3e]">TnTech</span>{" "}
                hướng đến mục tiêu trở thành thương hiệu uy tín hàng đầu
                tại Việt Nam trong lĩnh vực cung cấp sản phẩm công nghệ,
                đồng hành cùng khách hàng trên mọi chặng đường phát triển
                và góp phần xây dựng một cộng đồng tiêu dùng thông minh, bền vững,
                và hiện đại.
              </p>
              <br />
              <p className="text-lg">
                <span className="font-black text-[#3e3e3e]">TnTech</span>{" "}
                hướng đến mục tiêu trở thành thương hiệu uy tín hàng đầu trong
                lĩnh vực cung cấp các sản phẩm công nghệ tại Việt Nam, đồng hành cùng khách
                hàng trên mọi chặng đường và góp phần xây dựng một cộng đồng tiêu
                dùng thông minh, bền vững.
              </p>
            </div>
            <img
              src={back}
              className="w-full lg:w-5/12  rounded-xl shadow-2xl"
            />
          </div>
        </div>
      </div>

      <div className="w-full h-auto relative overflow-hidden flex items-center justify-center">
        <div className="w-11/12 md:w-4/5 bg-white z-20 flex flex-col items-center md:gap-10 border-2 border-[#3e3e3e] rounded-xl shadow-2xl py-10">
          <div className="w-full flex flex-col md:flex-row items-center justify-center gap-3">
            <p className="text-5xl font-black text-[#1677ff]">Vì sao chọn</p>
            <img src={tab} className="w-[100px]" />
          </div>
          <div className="w-11/12 md:w-4/5 mt-10">
            <QuestionBox
              icon={tab}
              tilte={"Sản phẩm chất lượng hàng đầu"}
              context={
                "TnTech luôn chú trọng vào việc hợp tác với các nhà cung cấp uy tín, đảm bảo quy trình sản xuất đạt chuẩn chất lượng và độ bền vượt trội. Mỗi sản phẩm đến tay khách hàng đều trải qua quy trình kiểm tra nghiêm ngặt, cam kết mang lại sự tiện lợi, an toàn và trải nghiệm tốt nhất cho người sử dụng."
              }

            />
            <QuestionBox
              icon={tab}
              tilte={"Nguồn gốc xuất xứ rõ ràng"}
              context={
                "minh bạch trong mọi hoạt động, cam kết cung cấp đầy đủ thông tin về nguồn gốc xuất xứ của từng sản phẩm. Khách hàng có thể dễ dàng truy xuất nguồn gốc sản phẩm thông qua hệ thống tem truy xuất điện tử được gắn trên mỗi sản phẩm."
              }
            />
            <QuestionBox
              icon={tab}
              tilte={"Giá cả hợp lý"}
              context={
                "luôn nỗ lực để mang đến cho khách hàng những sản phẩm chất lượng cao với mức giá hợp lý nhất. Chúng tôi hiểu rằng giá cả là một yếu tố quan trọng ảnh hưởng đến quyết định mua sắm của khách hàng, vì vậy TnTech luôn cân nhắc kỹ lưỡng để đưa ra mức giá phù hợp với mọi đối tượng khách hàng."
              }
            />
            <QuestionBox
              icon={tab}
              tilte={"Dịch vụ chuyên nghiệp, tận tâm"}
              context={
                "đặt lợi ích của khách hàng lên hàng đầu, luôn sẵn sàng hỗ trợ khách hàng tận tình, chu đáo. Đội ngũ nhân viên chuyên nghiệp, am hiểu sản phẩm sẽ luôn tư vấn và giải đáp mọi thắc mắc của khách hàng một cách nhanh chóng và hiệu quả."
              }
            />
            <QuestionBox
              icon={tab}
              tilte={"Giao hàng nhanh chóng, tiện lợi"}
              context={
                " hợp tác với các nhà cung cấp dịch vụ vận chuyển uy tín để đảm bảo giao hàng nhanh chóng, đúng hẹn đến tay khách hàng. Chúng tôi cung cấp đa dạng các hình thức thanh toán để khách hàng có thể lựa chọn phương thức phù hợp nhất với nhu cầu của mình."
              }
            />
          </div>
        </div>
        {/* <img
                    src={tab}
                    className="absolute w-full h-screen z-10"
                /> */}
        {/* <BubblesBG /> */}
      </div>
    </div>
  );
};

export default Introduce;
