<template>
  <div class="container">
    <h1 class="mt-3">Удалённое управление: <u>БКМ 1</u></h1>
    <div class="row mt-3 p-3 topmenu shadow rounded-2 justify-content-center">
      <div class="col col-auto me-auto">
        <RouterLink to="/robot" class="btn btn-primary">Назад</RouterLink>
      </div>

      <div class="col col-auto">
        <emer-stop-button/>
      </div>
      <div class="col">
        <BatteryInfo/>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-8">
        <div class="row m-1">
          <div class="col">
            <ul class="nav nav-pills">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">Карта</a>
              </li>
              <li class="nav-item">
                <a class="nav-link disabled" href="#">Видео</a>
              </li>

              <li class="nav-item">
                <a class="nav-link disabled">Лидар</a>
              </li>

            </ul>
          </div>
        </div>
        <div id="teleop_view"></div>
        <img class="img-fluid rounded-4 h-50 mt-2 " src="/map_placeholder.png"/>
      </div>
      <div class="col-4">
        <div class="row">
          <div class="col-12 "><h3 class="text-center">Управление</h3>
            <div class="card bg-light">
              <div class="card-body text-dark">
                <div class="row">
                  <div class="col-4">
                    <div class="form-check form-switch">
                      <input class="form-check-input big-check-box" type="checkbox" role="switch"
                             id="flexSwitchCheckDefault">
                      <label class="form-check-label" for="flexSwitchCheckDefault">Фары</label>
                    </div>
                  </div>
                  <div class="col-auto">
                    <div class="form-check form-switch" style="">
                      <input class="form-check-input big-check-box" type="checkbox" role="switch"
                             id="flexSwitchCheckDefault">
                      <label class="form-check-label" for="flexSwitchCheckDefault"> Проблесковые маячки</label>
                    </div>
                  </div>
                </div>
                <hr>
                <div class="row mt-3">
                  <div class="col-auto">
                    <button class="btn btn-sm btn-primary">Звуковой сигнал</button>
                  </div>
                </div>
                <hr>
                <div class="row mt-3">
                  <div class="col-auto">
                    <div class="form-check form-switch" style="">
                      <input class="form-check-input big-check-box" type="checkbox" role="switch"
                             id="flexSwitchCheckDefault">
                      <label class="form-check-label" for="flexSwitchCheckDefault">Щетка</label>
                    </div>
                  </div>
                </div>
                <div class="row mt-3">
                  <div class="col-12">
                    <label for="customRange3" class="form-label">Скорость вращения: {{ shetka_speed }}</label>
                    <input v-on:input="set_shetka_speed" type="range" class="form-range" min="0" max="5" step="0.5"
                           id="shetka_speed_range">
                  </div>
                </div>
                <hr>
                <div class="row mt-3">
                  <div class="col-auto">
                    <div class="form-check form-switch " style="">
                      <input class="form-check-input big-check-box" style="" type="checkbox" role="switch"
                             id="flexSwitchCheckDefault">
                      <label class="form-check-label" for="flexSwitchCheckDefault">Управление движением</label>
                    </div>
                    <div class="col-auto mt-3">
                      <svg class="img-fluid" width="576" height="345" viewBox="0 0 576 345" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g filter="url(#filter0_d_1_32)">
                          <rect x="4" width="568" height="337" rx="109" fill="#00446A"/>
                          <g v-on:click="presseee('right')" filter="url(#filter1_d_1_32)">
                            <rect x="229" y="54" width="118" height="84" rx="7" fill="#D9D9D9"/>
                            <path d="M289.061 71.9393C288.475 71.3536 287.525 71.3536 286.939 71.9393L277.393 81.4853C276.808 82.0711 276.808 83.0208 277.393 83.6066C277.979 84.1924 278.929 84.1924 279.515 83.6066L288 75.1213L296.485 83.6066C297.071 84.1924 298.021 84.1924 298.607 83.6066C299.192 83.0208 299.192 82.0711 298.607 81.4853L289.061 71.9393ZM289.5 119V73H286.5V119H289.5Z" fill="black"/>
                          </g>
                          <g v-on:click="presseee('up')" filter="url(#filter2_d_1_32)">
                            <rect x="380" y="127" width="118" height="84" rx="7" fill="#D9D9D9"/>
                            <path d="M463.061 170.061C463.646 169.475 463.646 168.525 463.061 167.939L453.515 158.393C452.929 157.808 451.979 157.808 451.393 158.393C450.808 158.979 450.808 159.929 451.393 160.515L459.879 169L451.393 177.485C450.808 178.071 450.808 179.021 451.393 179.607C451.979 180.192 452.929 180.192 453.515 179.607L463.061 170.061ZM416 170.5H462V167.5H416V170.5Z" fill="black"/>
                          </g>
                          <g v-on:click="presseee('left')" filter="url(#filter3_d_1_32)">
                            <rect x="78" y="127" width="118" height="84" rx="7" fill="#D9D9D9"/>
                            <path d="M112.939 167.939C112.354 168.525 112.354 169.475 112.939 170.061L122.485 179.607C123.071 180.192 124.021 180.192 124.607 179.607C125.192 179.021 125.192 178.071 124.607 177.485L116.121 169L124.607 160.515C125.192 159.929 125.192 158.979 124.607 158.393C124.021 157.808 123.071 157.808 122.485 158.393L112.939 167.939ZM160 167.5L114 167.5L114 170.5L160 170.5L160 167.5Z" fill="black"/>
                          </g>
                          <g v-on:click="presseee('down')"  filter="url(#filter4_d_1_32)">
                            <rect x="229" y="195" width="118" height="84" rx="7" fill="#D9D9D9"/>
                            <path d="M286.939 261.061C287.525 261.646 288.475 261.646 289.061 261.061L298.607 251.515C299.192 250.929 299.192 249.979 298.607 249.393C298.021 248.808 297.071 248.808 296.485 249.393L288 257.879L279.515 249.393C278.929 248.808 277.979 248.808 277.393 249.393C276.808 249.979 276.808 250.929 277.393 251.515L286.939 261.061ZM286.5 214L286.5 260L289.5 260L289.5 214L286.5 214Z" fill="black"/>
                          </g>
                        </g>
                        <defs>
                          <filter id="filter0_d_1_32" x="0" y="0" width="576" height="345" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                            <feOffset dy="4"/>
                            <feGaussianBlur stdDeviation="2"/>
                            <feComposite in2="hardAlpha" operator="out"/>
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_32"/>
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_32" result="shape"/>
                          </filter>
                          <filter id="filter1_d_1_32" x="225" y="54" width="126" height="92" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                            <feOffset dy="4"/>
                            <feGaussianBlur stdDeviation="2"/>
                            <feComposite in2="hardAlpha" operator="out"/>
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_32"/>
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_32" result="shape"/>
                          </filter>
                          <filter id="filter2_d_1_32" x="376" y="127" width="126" height="92" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                            <feOffset dy="4"/>
                            <feGaussianBlur stdDeviation="2"/>
                            <feComposite in2="hardAlpha" operator="out"/>
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_32"/>
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_32" result="shape"/>
                          </filter>
                          <filter id="filter3_d_1_32" x="74" y="127" width="126" height="92" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                            <feOffset dy="4"/>
                            <feGaussianBlur stdDeviation="2"/>
                            <feComposite in2="hardAlpha" operator="out"/>
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_32"/>
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_32" result="shape"/>
                          </filter>
                          <filter id="filter4_d_1_32" x="225" y="195" width="126" height="92" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                            <feOffset dy="4"/>
                            <feGaussianBlur stdDeviation="2"/>
                            <feComposite in2="hardAlpha" operator="out"/>
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_32"/>
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_32" result="shape"/>
                          </filter>
                        </defs>
                      </svg>

                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import EmerStopButton from "./EmerStopButton.vue";
import BatteryInfo from "./BatteryInfo.vue";

export default {
  name: "TeleopPage",
  components: {BatteryInfo, EmerStopButton},
  data: function () {
    return {
      shetka_speed: 0
    }
  },
  methods: {
    set_shetka_speed() {
      this.shetka_speed = document.getElementById("shetka_speed_range").value
    },
    presseee(a) {
      alert('presset '+a);
    }
  }
}
</script>

<style scoped lang="scss">


.big-check-box {
  width: 2vw;
  height: 2vh;
  margin-right: 1rem;
}
</style>