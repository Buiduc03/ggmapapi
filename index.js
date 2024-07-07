async function initMap() {
    // Request needed libraries.
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    const center = { lat: 21.619873861774444, lng: 106.54205609545978 };
    const map = new Map(document.getElementById("map"), {
        zoom: 12,
        center,
        mapId: "4504f8b37365c3d0",
    });

    const additionalMarkers = [
        new google.maps.Marker({
            position: { lat: 21.611143181506804, lng: 106.53736889545947 },
            map,
            title: "Xã Chi Lăng",
        }),
        new google.maps.Marker({
            position: { lat: 21.57696069404205, lng: 106.5053119539405 },
            map,
            title: "Thị Trấn Chi Lăng",
        }),
        new google.maps.Marker({
            position: { lat: 21.66114212906457, lng: 106.57629392598757 },
            map,
            title: "Thị Trấn Đồng Mỏ",
        }),
        new google.maps.Marker({
            position: { lat: 21.570844003265755, lng: 106.72755505630819 },
            map,
            title: "Xã Mai Sao",
        }),
    ];


    const markers = properties.map(property => {
        const marker = new AdvancedMarkerElement({
            map,
            content: buildContent(property),
            position: property.position,
            title: property.description,
        });
        marker.addListener("click", () => {
            toggleHighlight(marker, property);
        });
        return marker;
    });

    function updateMarkersVisibility(zoom) {
        markers.forEach(marker => {
            marker.map = zoom > 12 ? map : null;
        });
        additionalMarkers.forEach(marker => {
            marker.setMap(zoom === 12 ? map : null);
        });
    }

    map.addListener("zoom_changed", () => {
        const zoom = map.getZoom();
        updateMarkersVisibility(zoom);
    });

    // Set initial marker visibility based on the initial zoom level
    updateMarkersVisibility(map.getZoom());
}

function toggleHighlight(markerView, property) {
    if (markerView.content.classList.contains("highlight")) {
        markerView.content.classList.remove("highlight");
        markerView.zIndex = null;
    } else {
        markerView.content.classList.add("highlight");
        markerView.zIndex = 1;
    }
}

function buildContent(property) {
    const content = document.createElement("div");
    content.classList.add("property");
    content.innerHTML = `
      <div class="icon">
          <i aria-hidden="true" class="fa fa-icon fa-${property.type}" title="${property.type}"></i>
          <span class="fa-sr-only">${property.type}</span>
      </div>
      <div class="details">
          <div class="address">${property.address}</div>
          <div class="features">
          <div>
              <i aria-hidden="true" class="fa fa-ruler fa-lg size" title="size"></i>
              <span class="fa-sr-only">size</span>
              <span>${property.square} ft<sup>2</sup></span>
          </div>
          </div>
          <button class="image-button" onclick="window.open('${property.image}', '_blank')">View</button>
      </div>
      `;
    return content;
}

const properties = [
    {
        address: "Thành Lũy Kai Kinh, Khu Cây Hồng",
        description: "Townhouse with friendly neighborsnơi đóng quân của nghĩa quân Cai Kinh nhằm kiểm soát con đường từ Mục Nam Quan về Hà Nội",
        type: "building",
        bed: 4,
        bath: 3,
        square: 200,
        position: { lat: 21.543788571061505, lng: 106.40526266800627 },
        image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0a/aa/43/f5/photo5jpg.jpg?w=600&h=400&s=1"
    },
    {
        address: "Lũng Ngần, Khu Pha Lác",
        description: "Là trận địa then chốt trước cửa ngõ phía Bắc của trận đồ Chi Lăng",
        type: "warehouse",
        square: 800,
        position: { lat: 21.570869934988508, lng: 106.72744628991879 },
        image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0a/aa/43/f5/photo5jpg.jpg?w=600&h=400&s=1"

    },
    {
        address: "Chợ Quận Công, Khu Đồng Bành",
        description: "Là nơi tụ họp, buôn bán của bà con nhân dân trong vùng.",
        type: "store-alt",
        square: 210,
        position: { lat: 21.577356926172953, lng: 106.5045077954585 },
        image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0a/aa/43/f5/photo5jpg.jpg?w=600&h=400&s=1"

    },
    {
        address: "Núi Bàn Cờ, Khu Phố Sặt",
        description: "Thủ lĩnh Hoàng Đình Kinh đã chọn núi Bàn Cờ làm nơi luyện tập binh sĩ, nơi đóng quân, chiêu quân chống giặc",
        type: "warehouse",
        square: 700,
        position: { lat: 21.57946118919078, lng: 106.5139264251089 },
        image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0a/aa/43/f5/photo5jpg.jpg?w=600&h=400&s=1"

    },
    {
        address: "Lân Ba Tài, Khu Minh Hòa",
        description: "Là một thung lũng nhỏ nằm ở chân núi Tay Ngai",
        type: "home",
        square: 100,
        position: { lat: 37.41391636421949, lng: -121.94592071575907 },
        image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0a/aa/43/f5/photo5jpg.jpg?w=600&h=400&s=1"

    },
    {
        address: "Hòn đá mổ lợn, Thôn Làng Cằng",
        description: "Nơi các tướng sĩ của ta  cho mổ lợn chiêu đãi quân sĩ  để ăn mừng chiến thắng.",
        type: "store-alt",
        square: 450,
        position: { lat: 21.58862788955379, lng: 106.52746574470362 },
        image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0a/aa/43/f5/photo5jpg.jpg?w=600&h=400&s=1"

    },
    {
        address: "Lò Gạch Cổ, Thôn Làng Ngũa",
        description: "Không còn dấu vết của lò gạch cổ.",
        type: "home",
        square: 500,
        position: { lat: 21.59782395372591, lng: 106.52536492820673 },
        image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0a/aa/43/f5/photo5jpg.jpg?w=600&h=400&s=1"

    },
    {
        address: "Quảng Trường Đồng Đĩnh, Thôn Đồng Đĩnh",
        description: "Một khu đất bằng phẳng và rộng,  giờ khu vực nầy dân sinh sống và trồng cây",
        type: "home",
        square: 500,
        position: { lat: 21.607083936534377, lng: 106.52817033390342 },
        image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0a/aa/43/f5/photo5jpg.jpg?w=600&h=400&s=1"

    },
    {
        address: "Quán Thanh, Thôn Quán Thanh",
        description: "Nay là khu dân cư sinh sống.",
        type: "home",
        square: 500,
        position: { lat: 21.609836759111005, lng: 106.53439335875785 },
        image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0a/aa/43/f5/photo5jpg.jpg?w=600&h=400&s=1"

    },
    {
        address: "Xóm Gốc Gạo, Thôn Quán Thanh",
        description: "Xóm Gốc Gạo kéo dài 1km, hai bên là núi, sông.",
        type: "home",
        square: 500,
        position: { lat: 21.60725984931234, lng: 106.53268419585956 },
        image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0a/aa/43/f5/photo5jpg.jpg?w=600&h=400&s=1"

    },
    {
        address: "Núi hòn ngọc (Núi Tỷ Muội hay Tuần Muội), Khu Than Muội",
        description: "Núi tự nhiên độc lập  nổi lên giữa cánh đồng thung lũng Chi Lăng",
        type: "home",
        square: 500,
        position: { lat: 21.61991393707913, lng: 106.5401232157079 },
        image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0a/aa/43/f5/photo5jpg.jpg?w=600&h=400&s=1"

    },
    {
        address: "Chùa Hang, Khu Than Muội",
        description: "Cảnh quan đã bị biến đổi",
        type: "home",
        square: 500,
        position: { lat: 21.66046543042727, lng: 106.57900469938416 },
        image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0a/aa/43/f5/photo5jpg.jpg?w=600&h=400&s=1"

    },
    {
        address: "Làng Lìu, Khu Hữu Nghị",
        description: "Làng Lìu hiện nay là một xóm nhỏ thuộc thôn Đông Mồ, xă Quang Lang.",
        type: "home",
        square: 500,
        position: { lat: 21.841909834013514, lng: 106.74959727197206 },
        image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0a/aa/43/f5/photo5jpg.jpg?w=600&h=400&s=1"

    },
    {
        address: "Đền Hổ Lai (Miếu Hồ Lai), Thôn Lạng Nắc",
        description: "Miếu Hồ Lai được xây dựng theo hướng Đông Nam",
        type: "home",
        square: 500,
        position: { lat: 21.840800349431383, lng: 106.75500208224423 },
        image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0a/aa/43/f5/photo5jpg.jpg?w=600&h=400&s=1"

    }
];

initMap();
