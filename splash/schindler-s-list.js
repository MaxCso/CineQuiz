// CinéQuiz splash chunk — Schindler's List
(function(){
window._splashRegistry=window._splashRegistry||{};
window._splashRegistry["Schindler's List"]={
   name:"Schindler's List",
   color:'200,30,30',
   ref:"Schindler's List \u2014 Steven Spielberg, 1993",
   run(cv,ctx,W,H,stop){
    cv.style.opacity='1';
    let t=0;const cx=W/2;

    /* ── Repositionner la citation sous le logo CinéQuiz ── */
    let _sc=document.getElementById('_schl_s');
    if(!_sc){_sc=document.createElement('style');_sc.id='_schl_s';document.head.appendChild(_sc);}
    _sc.textContent='#splash-content-wrap{top:28%!important;transform:translateY(0)!important;}#splash-content-wrap.reveal{transform:translateY(0)!important;}';
    const _sw=setInterval(()=>{if(stop.v){_sc.textContent='';clearInterval(_sw);}},200);

    /* ── Cendres / flocons de cendre ── */
    const ashes=Array.from({length:130},()=>({
     x:Math.random()*W,y:Math.random()*H,
     vx:(Math.random()-0.5)*0.45,vy:Math.random()*0.55+0.12,
     rx:Math.random()*3.5+0.6,ry:Math.random()*1.8+0.3,
     op:Math.random()*0.50+0.10,
     rot:Math.random()*Math.PI*2,rotSpd:(Math.random()-0.5)*0.020,
     wobble:Math.random()*Math.PI*2,wobSpd:Math.random()*0.016+0.005,
     isEmber:Math.random()<0.15,
    }));

    /* ── Fumée montante ── */
    const smokeP=Array.from({length:12},(_,i)=>({
     x:cx+(Math.random()-0.5)*12,
     y:H*0.62-i*H*0.03,
     r:W*(0.018+i*0.012),
     op:0.06-i*0.004,
     vx:(Math.random()-0.5)*0.08,
     vy:-(0.10+Math.random()*0.08),
     ph:Math.random()*Math.PI*2,
    }));

    /* ── Bougie ── positionnée à gauche du manteau, bien visible */
    const candleX=cx-W*0.34, candleBaseY=H*0.72;
    const candleW=W*0.024, candleH=H*0.065;
    let flickerPhase=0;

    /* ── Manteau SVG overlay ── */
    const _manteauId='_schindler_manteau_svg';
    let _manteauEl=document.getElementById(_manteauId);
    if(!_manteauEl){
      _manteauEl=document.createElement('div');
      _manteauEl.id=_manteauId;
      _manteauEl.style.cssText='position:absolute;pointer-events:none;z-index:1;bottom:22%;left:50%;transform:translateX(-50%);width:38%;max-width:148px;opacity:0;';
      const svgNS='http://www.w3.org/2000/svg';
      const svgEl=document.createElementNS(svgNS,'svg');
      svgEl.setAttribute('viewBox','0 0 234 324');
      svgEl.setAttribute('fill','none');
      svgEl.setAttribute('xmlns','http://www.w3.org/2000/svg');
      svgEl.style.cssText='width:100%;height:auto;filter:drop-shadow(0 0 18px rgba(180,30,30,0.45)) drop-shadow(0 4px 24px rgba(0,0,0,0.80));';
      svgEl.innerHTML=`<path d="M148.974 12.9485C149.443 13.2686 149.912 13.5886 150.711 14.3252C151.664 15.1227 152.287 15.5037 152.909 15.8846C152.909 15.8846 152.877 15.8871 153.01 16.0867C153.413 16.483 153.684 16.6797 153.955 16.8763C153.955 16.8763 153.887 16.8807 154.015 17.0721C154.416 17.4668 154.69 17.6701 154.964 17.8734C154.964 17.8734 154.89 17.874 155.018 18.0641C155.419 18.4606 155.693 18.6669 155.967 18.8732C155.967 18.8732 155.891 18.8739 156.018 19.0632C156.418 19.4595 156.691 19.6666 156.964 19.8738C156.964 19.8738 156.89 19.8747 157.022 20.0668C157.435 20.4649 157.716 20.6707 157.998 20.8766C158.338 20.8839 158.596 21.0324 158.962 21.7792C159.431 22.4496 159.711 22.6631 159.99 22.8767C160.331 22.882 160.59 23.0297 160.952 23.7771C161.41 24.4484 161.684 24.6621 161.959 24.8758C161.959 24.8758 161.888 24.8763 162.016 25.0658C162.414 25.4622 162.685 25.6691 162.956 25.876C162.956 25.876 162.887 25.878 163.021 26.0702C163.437 26.4672 163.717 26.672 163.998 26.8767C164.338 26.8836 164.594 27.0329 164.954 27.7789C165.414 28.4469 165.688 28.6607 165.961 28.8745C165.961 28.8745 165.89 28.8747 166.015 29.0643C166.406 29.4627 166.673 29.6715 166.939 29.8803C166.939 29.8803 166.883 29.8827 166.914 30.1864C168.058 34.0627 165.207 34.1626 163.087 34.8533C154.71 37.583 146.325 40.2887 137.55 43.1309C139.857 47.226 141.458 51.6768 145.691 49.1028C155.029 43.4248 165.05 42.5384 175.481 42.9292C175.481 42.9292 175.719 42.866 175.85 43.2999C178.986 45.4259 181.99 47.1181 184.994 48.8102C184.994 48.8102 184.919 48.8499 184.959 49.1711C186.428 50.4536 187.857 51.415 189.287 52.3763C189.287 52.3763 189.059 52.4215 189.205 52.7072C189.683 53.0989 190.015 53.2048 190.346 53.3108C190.346 53.3108 190.376 53.3681 190.386 53.6687C190.714 54.1116 191.031 54.2538 191.349 54.396C191.349 54.396 191.382 54.4429 191.29 54.8058C192.781 56.7301 194.365 58.2915 195.948 59.853C195.948 59.853 195.887 59.8672 195.894 60.2001C196.601 61.2956 197.3 62.0583 198 62.821C198 62.821 197.919 62.8475 197.918 63.1933C198.174 64.4931 198.362 65.4724 198.7 66.3973C203.236 78.8353 208.447 91.0744 212.157 103.753C215.732 115.968 218.304 128.547 220.336 141.124C223.026 157.777 224.929 174.565 226.845 191.332C227.859 200.21 227.96 209.19 228.905 218.078C229.509 223.755 230.901 229.347 231.94 234.977C231.94 234.977 231.93 234.897 231.647 234.926C230.887 235.319 230.41 235.684 229.954 236.001C229.974 235.953 230.063 236.009 229.675 235.965C227.87 236.678 226.452 237.435 225.015 238.149C224.995 238.107 225.088 238.1 224.642 238.028C219.744 238.272 215.295 238.807 210.84 238.861C200.091 238.99 200.093 238.899 197.494 228.684C197.418 228.388 197.117 228.149 196.914 227.469C194.883 217.528 193.083 207.947 190.723 198.505C189.819 194.89 190.607 192.386 193.145 190.112C196.243 187.336 199.397 184.621 203.24 181.254C201.493 181.254 200.845 181.149 200.241 181.27C187.25 183.876 187.363 183.858 184.751 170.97C184.247 168.485 182.48 166.257 181.114 163.737C180.201 162.725 179.469 161.885 178.4 161.115C178.416 162.521 178.768 163.858 179.103 165.262C179.087 165.33 178.95 165.309 178.917 165.749C178.338 170.205 175.139 168.856 172.999 168.762C169.178 168.596 167.722 169.738 167.783 173.823C168.004 188.804 168.032 203.793 167.762 218.773C167.691 222.712 169.308 224.049 172.688 224.655C180.643 226.082 187.981 228.972 194.229 234.288C194.177 234.394 193.957 234.308 193.939 234.766C193.931 236.446 193.94 237.668 194.006 239.297C195.006 248.404 195.887 257.111 196.913 265.8C197.82 273.491 198.888 281.163 199.884 289.278C200.865 295.282 197.264 295.093 193.509 294.854C182.75 294.17 171.994 293.327 161.222 292.994C156.979 292.863 155.858 291.289 155.814 287.311C155.719 278.51 155.286 269.709 154.786 260.919C153.544 239.055 152.176 217.198 150.884 195.336C150.492 188.708 150.201 182.074 149.833 175.444C149.475 168.981 148.997 162.523 148.713 156.057C148.175 143.784 144.865 131.511 148.543 119.537C137.58 118.57 127.691 113.944 117.673 109.902C107.605 105.839 97.715 101.335 87.6908 97.0003C86.0275 100.619 87.1697 102.428 90.2213 104.124C103.725 111.629 117.43 118.623 132.293 123.11C133.024 123.33 133.465 124.509 133.747 125.24C133.061 125.223 132.67 125.207 132.007 125.195C131.45 125.41 131.164 125.62 130.562 125.983C129.502 127.01 128.224 127.826 128.12 128.771C127.851 131.211 127.221 134.313 128.39 136.011C129.552 137.699 132.857 138.92 134.987 138.629C136.866 138.372 139.805 135.75 139.809 134.166C139.817 131.467 137.89 128.763 137.026 125.785C141.48 124.093 142.725 126.514 142.843 130.002C143.242 141.736 143.632 153.473 143.776 165.211C143.796 166.815 142.406 168.436 141.402 169.83C136.373 166.104 132.283 166.518 129.773 170.762C127.887 173.952 129.245 178.137 132.85 180.052C136.478 181.979 139.198 180.291 142.038 177.827C143.234 180.853 144.617 183.74 144.767 186.69C145.347 198.138 145.525 209.606 145.872 221.066C146.537 242.989 147.149 264.913 147.944 286.831C148.096 291.034 147.346 293.448 142.368 293.116C138.936 292.888 135.447 293.706 131.975 293.84C120.02 294.302 108.042 294.382 96.1075 295.142C80.7313 296.12 65.3866 297.597 50.0316 298.897C46.7711 299.173 43.5241 299.609 40.271 299.972C40.3021 300.4 40.3332 300.828 40.3643 301.256C76.3838 301.256 112.403 301.256 148.423 301.256C148.653 301.795 148.884 302.334 149.114 302.873C147.581 303.895 146.155 305.564 144.498 305.839C129.482 308.329 114.446 310.722 99.3706 312.819C93.4724 313.639 87.4617 313.895 81.4978 313.953C66.4043 314.101 51.291 313.565 36.2211 314.176C29.3595 314.454 27.0903 311.911 27.3219 305.727C27.3678 305.721 27.4519 305.759 27.8013 305.578C29.0187 300.517 29.8867 295.637 30.7132 290.828C30.6718 290.899 30.5324 290.812 30.8658 290.601C31.3978 288.854 31.5965 287.319 31.7672 285.846C31.7392 285.91 31.6141 285.851 31.9442 285.602C32.4586 284.005 32.6427 282.657 32.7562 281.335C32.6857 281.36 32.6255 281.223 32.8964 280.94C33.3401 279.679 33.5129 278.701 33.6259 277.795C33.566 277.867 33.4257 277.742 33.7832 277.565C34.3586 275.852 34.5765 274.315 34.7691 272.841C34.7439 272.903 34.6213 272.848 34.9308 272.629C35.4103 271.189 35.5803 269.967 35.6718 268.798C35.5933 268.851 35.4848 268.696 35.766 268.655C36.319 268.368 36.5906 268.122 36.8731 267.486C36.8399 266.317 36.7959 265.538 36.7351 264.82C36.7183 264.881 36.5999 264.836 36.9282 264.587C37.4458 262.995 37.6351 261.651 37.7501 260.343C37.6758 260.379 37.5945 260.236 37.8911 259.919C38.4007 258.505 38.6136 257.409 38.7651 256.358C38.7038 256.404 38.6065 256.286 38.8754 255.993C39.3291 254.708 39.514 253.717 39.6416 252.797C39.5843 252.869 39.4438 252.75 39.7914 252.582C40.3409 251.196 40.5428 249.978 40.6971 248.825C40.6493 248.89 40.5215 248.792 40.8528 248.598C41.3588 247.177 41.5334 245.948 41.679 244.797C41.6499 244.874 41.5018 244.802 41.8518 244.575C42.4103 243.002 42.6188 241.655 42.7653 240.338C42.7032 240.366 42.6395 240.245 42.9078 239.959C43.3679 238.691 43.5597 237.71 43.7407 236.791C43.7299 236.854 43.6086 236.816 43.901 236.657C44.3388 235.886 44.4843 235.273 44.5782 234.706C44.5266 234.752 44.445 234.64 44.8356 234.585C51.5074 233.317 57.744 231.526 64.0809 231.039C72.0223 230.428 80.0543 230.669 88.0308 230.973C92.2395 231.134 93.2831 229.389 92.8963 225.681C92.4669 221.565 91.8833 217.425 91.9489 213.304C92.186 198.423 92.6678 183.545 93.0584 168.622C86.8156 169.843 80.4269 171.511 73.9327 172.244C67.6486 172.954 61.256 172.704 54.9694 172.475C55.9489 168.427 56.8817 164.777 53.7885 160.854C52.4384 163.404 51.3406 165.478 50.1717 167.687C45.156 166.502 40.4019 165.38 35.6478 164.257C37.3269 166.492 39.2057 168.321 41.4229 169.53C47.228 172.694 50.9274 176.766 48.8841 183.892C48.876 183.869 48.9255 183.863 48.6572 184.13C48.226 185.907 48.0632 187.418 47.8917 188.899C47.8831 188.87 47.9437 188.865 47.6691 189.131C46.8942 192.904 46.3939 196.411 45.8851 199.894C45.8767 199.869 45.9284 199.864 45.6597 200.123C45.306 203.206 45.2209 206.03 45.0624 208.833C44.9889 208.811 45.0514 208.67 45.032 209.003C45.3935 209.827 45.7745 210.318 46.1054 210.848C46.0554 210.886 45.9803 210.784 45.9492 211.237C45.9252 214.115 45.9323 216.541 45.9309 218.931C45.9226 218.896 45.9955 218.893 45.7574 219.009C45.3141 219.408 45.1088 219.69 44.9116 219.937C44.9196 219.901 44.9847 219.933 44.6645 219.95C43.8875 220.363 43.4306 220.758 42.9727 221.094C42.9716 221.035 43.0871 221.061 42.7545 221.039C41.9395 221.406 41.4572 221.795 40.9633 222.118C40.9517 222.053 41.0845 222.056 40.7624 222.033C39.9231 222.332 39.4058 222.656 38.9146 222.939C38.9406 222.899 39.0173 222.955 38.574 222.929C29.0134 223.265 19.8959 223.626 10.8564 224.053C10.9343 224.119 10.8059 224.277 10.6159 223.935C7.55823 223.028 4.69066 222.463 1.82307 221.898C1.82307 221.898 1.88344 221.877 1.76324 221.681C1.36751 221.284 1.09197 221.083 0.816406 220.882C0.816406 220.882 0.882156 220.885 0.888809 220.498C2.4053 210.48 4.25656 201.071 16.1811 197.939C14.044 196.332 12.3845 195.376 10.6307 194.647C6.75096 193.033 5.55907 190.81 6.37067 186.226C8.09943 176.461 9.04849 166.53 9.81917 156.629C11.0223 141.171 13.3641 126.012 19.0453 111.477C23.0846 101.143 26.9684 90.7453 30.7626 80.3184C33.0236 74.1049 34.9785 67.78 37.0677 61.504C37.6897 59.6354 38.3004 57.763 38.9164 55.8923C38.8731 55.5524 38.9753 55.2639 39.7016 54.8034C40.3797 54.2529 40.5792 53.926 40.7787 53.5991C40.7787 53.5991 40.7754 53.7947 40.9557 53.6643C41.3064 53.1852 41.4766 52.8364 41.6469 52.4877C41.6469 52.4877 41.6565 52.6954 41.8701 52.5956C42.358 51.9417 42.6324 51.3877 42.9068 50.8337C43.3732 50.2511 43.8395 49.6685 44.8963 48.9433C45.8763 48.3455 46.2659 47.8905 46.6555 47.4354C46.6555 47.4354 46.6324 47.5812 46.9407 47.6211C47.9698 46.8792 48.6906 46.0974 49.4115 45.3155C49.4115 45.3155 49.5626 45.3788 49.8185 45.4292C50.3063 45.1726 50.5382 44.8656 50.7701 44.5586C50.7701 44.5586 50.7659 44.6977 51.103 44.7391C52.5523 44.4926 53.7625 44.3948 54.7583 43.8812C57.8253 42.2993 60.7099 39.3392 63.8439 39.0812C81.5677 37.6218 98.8217 39.7189 113.989 49.8693C118.263 52.7297 121.126 50.8537 125.773 49.6912C122.82 47.2286 120.689 45.4504 119.556 44.5054C123.014 44.0086 126.951 43.443 131.221 42.8736C132.335 42.5462 133.116 42.2227 134.237 41.8512C135.997 40.1609 137.416 38.5184 138.849 36.4485C138.877 34.3094 138.89 32.5978 139.159 30.5788C140.245 24.4756 141.076 18.6798 142.181 12.6557C143.97 11.8918 145.485 11.356 147 10.8203C147 10.8203 146.917 10.8455 147.044 11.0416C147.474 11.4344 147.777 11.6311 148.08 11.8277C148.08 11.8277 147.933 11.8293 148.042 12.0176C148.425 12.4535 148.7 12.701 148.974 12.9485ZM39.787 74.6766L39.5169 74.6572C39.5169 74.6572 39.8978 74.8704 39.9908 75.5554C44.7678 82.8781 54.0115 87.8181 59.1971 85.8013C52.7509 82.159 46.316 78.523 39.787 74.6766ZM142.602 212.931C143.058 208.543 140.853 205.422 136.8 205.231C134.433 205.119 131.105 207.056 129.701 209.097C127.517 212.271 129.323 215.479 132.366 217.613C135.815 220.031 139.366 218.581 142.602 212.931ZM147.168 89.7126C144.858 91.3354 142.282 92.83 143.418 97.0224C151.045 92.1736 158.079 87.8685 164.879 83.2222C166.062 82.4138 166.26 80.1651 166.914 78.5817C166.297 78.1455 165.681 77.7092 165.064 77.273C159.3 81.2886 153.536 85.3042 147.168 89.7126ZM172.36 56.3357C172.074 56.9201 171.384 57.7311 171.565 58.0544C173.76 61.9748 176.082 65.8233 178.372 69.6905C178.775 69.4546 179.178 69.2188 179.581 68.983C179.076 64.0165 176.983 59.8304 172.36 56.3357ZM208.039 128.889C203.793 128.159 199.547 127.429 195.301 126.7C195.206 127.342 195.111 127.985 195.015 128.628C200.209 129.504 205.403 130.379 210.598 131.255C210.703 130.73 210.809 130.206 210.915 129.682C210.212 129.429 209.509 129.176 208.039 128.889Z" fill="#971B1F"/>
      <path d="M141.666 170.048C142.404 168.435 143.794 166.814 143.774 165.211C143.629 153.472 143.24 141.736 142.841 130.002C142.722 126.514 141.478 124.093 136.736 125.752C135.478 125.743 134.758 125.492 134.039 125.241C133.463 124.509 133.021 123.33 132.291 123.109C117.428 118.622 103.723 111.628 90.219 104.124C87.1673 102.428 86.0252 100.619 87.6884 97C97.7127 101.335 107.603 105.838 117.671 109.901C127.688 113.944 137.578 118.57 148.541 119.536C144.863 131.511 148.173 143.784 148.711 156.057C148.994 162.523 149.472 168.981 149.831 175.444C150.199 182.074 150.49 188.708 150.881 195.336C152.173 217.197 153.542 239.054 154.784 260.919C155.283 269.708 155.717 278.51 155.812 287.31C155.855 291.289 156.977 292.863 161.22 292.994C171.991 293.326 182.747 294.17 193.507 294.854C197.262 295.092 200.863 295.282 200.127 289.286C200.373 288.859 200.863 288.88 200.863 288.88C200.94 289.04 201.017 289.199 201.144 290.012C201.851 295.4 202.507 300.135 203.164 304.869C203.172 305.319 203.18 305.769 203.256 306.923C203.064 308.629 202.805 309.63 202.546 310.632C202.546 310.632 202.65 310.654 202.386 310.702C201.948 311.045 201.775 311.339 201.601 311.633C201.601 311.633 201.767 311.755 201.459 311.757C200.955 312.034 200.76 312.311 200.564 312.587C200.564 312.587 200.747 312.722 200.445 312.685C199.838 312.783 199.616 313.001 199.475 313.302C199.475 313.302 199.469 313.384 199.154 313.477C198.386 313.94 197.932 314.309 197.478 314.678C197.478 314.678 197.133 314.72 196.68 314.884C194.698 315.896 193.17 316.745 191.642 317.593C191.642 317.593 191.836 317.768 191.371 317.724C186.094 318.705 181.322 320.32 176.464 320.646C160.629 321.709 144.762 322.301 128.907 323.074C128.458 323.043 128.009 323.012 126.792 322.958C123.642 322.998 121.261 323.061 118.88 323.125C117.484 323.068 116.088 323.012 113.829 322.908C94.1163 321.565 75.2538 320.438 56.4241 318.907C46.5469 318.103 36.7273 316.591 26.8816 315.398C26.6891 315.306 26.4966 315.214 26.0312 314.61C26.2636 311.309 26.7687 308.521 27.2738 305.733C27.0879 311.911 29.3571 314.454 36.2187 314.176C51.2887 313.565 66.402 314.101 81.4955 313.953C87.4594 313.895 93.47 313.639 99.3683 312.819C114.444 310.722 129.479 308.329 144.495 305.839C146.153 305.564 147.579 303.895 149.112 302.873C148.881 302.334 148.651 301.795 148.42 301.256C112.401 301.256 76.3814 301.256 40.3619 301.256C40.3308 300.828 40.2997 300.4 40.2686 299.971C43.5218 299.609 46.7687 299.172 50.0292 298.897C65.3843 297.597 80.729 296.12 96.1051 295.141C108.04 294.382 120.017 294.301 131.972 293.84C135.445 293.706 138.934 292.887 142.366 293.116C147.343 293.448 148.094 291.033 147.941 286.831C147.147 264.913 146.534 242.988 145.87 221.066C145.522 209.605 145.345 198.137 144.765 186.689C144.615 183.74 143.232 180.853 142.13 177.473C141.786 174.689 141.726 172.369 141.666 170.048ZM187.374 300.874C177.314 300.919 167.254 300.964 157.194 301.008C157.171 301.933 157.148 302.858 157.125 303.783C172.124 302.509 187.069 301.75 201.574 307.529C201.989 302.772 200.557 300.444 195.846 300.836C193.369 301.041 190.861 300.873 187.374 300.874Z" fill="#711A1D"/>
      <path d="M146.838 10.5177C145.482 11.355 143.967 11.8907 141.822 12.7427C138.03 18.6927 136.582 24.5468 138.901 30.8852C138.887 32.5968 138.874 34.3083 138.511 36.4974C136.739 38.616 135.316 40.257 133.894 41.8981C133.113 42.2216 132.332 42.5452 130.968 42.629C127.931 42.0864 125.396 42.073 123.038 41.4199C118.256 40.0949 113.568 38.4238 108.603 36.892C108.363 36.8887 107.885 36.874 107.876 36.5046C105.681 29.8445 101.156 25.5338 95.5352 21.7289C94.1899 19.922 93.3191 18.124 92.0339 16.7001C90.0602 14.5134 87.8017 12.5838 85.6641 10.5451C86.2622 9.77666 86.6994 8.72275 87.482 8.28162C105.594 -1.92771 128.558 -4.33843 146.838 10.5177Z" fill="#6E1B1D"/>`;
      /* Append remaining paths from original SVG - simplified version with key shapes */
      svgEl.innerHTML += `<path d="M39.787 74.6766L39.5169 74.6572C39.5169 74.6572 39.8978 74.8704 39.9908 75.5554C44.7678 82.8781 54.0115 87.8181 59.1971 85.8013C52.7509 82.159 46.316 78.523 39.787 74.6766Z" fill="#711A1D"/>`;
      _manteauEl.appendChild(svgEl);
      /* Append to canvas parent */
      /* Insérer le manteau AVANT le rideau dans le DOM — même z-index, le rideau le couvre donc */
      const _curtainEl=document.getElementById('splash-curtain');
      if(_curtainEl&&_curtainEl.parentElement){_curtainEl.parentElement.insertBefore(_manteauEl,_curtainEl);}
      else{const _fb=document.getElementById('splash-canvas')?.parentElement||document.getElementById('splash');if(_fb)_fb.appendChild(_manteauEl);}
    }
    /* Le rideau couvre le manteau — on le rend visible immédiatement, sans attente */
    _manteauEl.style.opacity='1';
    /* Flicker the drop-shadow in sync with candle */
    const _manteauFlicker=setInterval(()=>{
      if(stop.v){_manteauEl.style.opacity='0';setTimeout(()=>{_manteauEl.remove();},1300);clearInterval(_manteauFlicker);return;}
      const fk=Math.sin(flickerPhase)*0.5;
      const glow=Math.round(80+fk*25);
      const alpha=(0.30+Math.abs(fk)*0.18).toFixed(2);
      svgEl.style.filter=`drop-shadow(0 0 ${glow}px rgba(200,60,30,${alpha})) drop-shadow(0 6px 28px rgba(0,0,0,0.85))`;
    },60);

    function drawStreet(){
     /* Fond noir & blanc — rue de Cracovie en perspective */
     const streetG=ctx.createLinearGradient(0,0,0,H);
     streetG.addColorStop(0,'#050505');
     streetG.addColorStop(0.35,'#080808');
     streetG.addColorStop(0.70,'#0c0c0c');
     streetG.addColorStop(1,'#060606');
     ctx.fillStyle=streetG;ctx.fillRect(0,0,W,H);

     /* Point de fuite — centre légèrement haut */
     const vp={x:cx,y:H*0.38};

     /* ── Lampadaires — halos sur les façades ── */
     const lampPosts=[
      {x:W*0.27, y:H*0.72, side:-1},
      {x:W*0.73, y:H*0.72, side:1},
     ];
     for(const lp of lampPosts){
      /* Halo sur la façade derrière */
      const wallHalo=ctx.createRadialGradient(lp.x,lp.y-H*0.08,0,lp.x,lp.y-H*0.08,W*0.28);
      wallHalo.addColorStop(0,`rgba(180,155,90,${0.10+Math.sin(flickerPhase*0.7+lp.side)*0.025})`);
      wallHalo.addColorStop(0.5,'rgba(130,100,45,0.03)');
      wallHalo.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=wallHalo;ctx.fillRect(0,0,W,H*0.90);
      /* Flaque lumineuse au sol */
      const poolG=ctx.createRadialGradient(lp.x,lp.y+H*0.04,0,lp.x,lp.y+H*0.04,W*0.12);
      poolG.addColorStop(0,`rgba(160,135,70,${0.13+Math.sin(flickerPhase*0.5)*0.03})`);
      poolG.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=poolG;ctx.beginPath();ctx.ellipse(lp.x,lp.y+H*0.04,W*0.12,H*0.025,0,0,Math.PI*2);ctx.fill();
      /* Poteau */
      ctx.strokeStyle='rgba(22,22,22,0.95)';ctx.lineWidth=W*0.008;ctx.lineCap='round';
      ctx.beginPath();ctx.moveTo(lp.x,lp.y);ctx.lineTo(lp.x,lp.y-H*0.16);ctx.stroke();
      /* Bras horizontal */
      ctx.beginPath();ctx.moveTo(lp.x,lp.y-H*0.16);ctx.lineTo(lp.x+lp.side*W*0.04,lp.y-H*0.17);ctx.stroke();
      /* Lanterne */
      ctx.fillStyle=`rgba(220,195,120,${0.72+Math.sin(flickerPhase*0.8+lp.side)*0.12})`;
      ctx.beginPath();ctx.ellipse(lp.x+lp.side*W*0.04,lp.y-H*0.17,W*0.012,W*0.012,0,0,Math.PI*2);ctx.fill();
      /* Halo de la lanterne */
      const lantG=ctx.createRadialGradient(lp.x+lp.side*W*0.04,lp.y-H*0.17,0,lp.x+lp.side*W*0.04,lp.y-H*0.17,W*0.065);
      lantG.addColorStop(0,`rgba(200,175,90,${0.18+Math.sin(flickerPhase*0.7)*0.04})`);
      lantG.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=lantG;ctx.fillRect(0,0,W,H*0.90);
     }

     /* Immeubles gauche — silhouettes */
     ctx.fillStyle='rgba(12,12,12,0.97)';
     const bldL=[[0,0.22,0.28,0.90],[0.06,0.14,0.18,0.90],[0.12,0.18,0.10,0.90],[0.18,0.10,0.10,0.90]];
     for(const [x,yTop,w] of bldL){
      ctx.fillRect(x*W,yTop*H,w*W,(0.90-yTop)*H);
     }
     /* Immeubles droite */
     const bldR=[[0.72,0.10,0.12,0.90],[0.80,0.16,0.10,0.90],[0.84,0.12,0.10,0.90],[0.90,0.20,0.10,0.90]];
     for(const [x,yTop,w] of bldR){
      ctx.fillRect(x*W,yTop*H,w*W,(0.90-yTop)*H);
     }

     /* Rue — pavés en perspective */
     const streetFloor=ctx.createLinearGradient(0,H*0.72,0,H);
     streetFloor.addColorStop(0,'#0e0e0e');
     streetFloor.addColorStop(0.5,'#111');
     streetFloor.addColorStop(1,'#0a0a0a');
     ctx.fillStyle=streetFloor;
     ctx.beginPath();
     ctx.moveTo(0,H);ctx.lineTo(W,H);
     ctx.lineTo(W*0.72,H*0.72);ctx.lineTo(W*0.28,H*0.72);
     ctx.closePath();ctx.fill();

     /* Lignes de pavés fuyant vers le point de fuite */
     ctx.strokeStyle='rgba(30,30,30,0.55)';ctx.lineWidth=0.7;
     for(let li=0;li<=8;li++){
      const px=W*(0.28+li*0.44/8);
      ctx.beginPath();ctx.moveTo(px,H*0.72);ctx.lineTo(vp.x+(px-vp.x)*0.05,vp.y+H*0.05);ctx.stroke();
     }
     for(let li=0;li<5;li++){
      const t2=li/5;
      const lx1=W*0.28+(W*0.5-W*0.28)*t2;
      const lx2=W*0.72+(W*0.5-W*0.72)*t2;
      const ly=H*0.72+(vp.y+H*0.05-H*0.72)*t2;
      ctx.beginPath();ctx.moveTo(lx1,ly);ctx.lineTo(lx2,ly);ctx.stroke();
     }

     /* ── Rails de train en perspective ── */
     /* Ballast sombre entre les rails */
     const railVpX=cx, railVpY=H*0.42;
     const railSpreadBot=W*0.085;   /* écartement en bas */
     const railSpreadVp=W*0.008;    /* écartement au point de fuite */

     /* Ballast */
     ctx.fillStyle='rgba(14,13,11,0.85)';
     ctx.beginPath();
     ctx.moveTo(cx-railSpreadBot*1.6,H);
     ctx.lineTo(cx+railSpreadBot*1.6,H);
     ctx.lineTo(railVpX+railSpreadVp*1.6,railVpY);
     ctx.lineTo(railVpX-railSpreadVp*1.6,railVpY);
     ctx.closePath();ctx.fill();

     /* Traverses */
     const nTies=14;
     for(let i=0;i<nTies;i++){
      const prog=Math.pow(i/nTies,1.4);
      const ty=H+(railVpY-H)*prog;
      const spread=railSpreadBot+(railSpreadVp-railSpreadBot)*prog;
      const tieW=spread*2.6;
      const tieH=Math.max(1.5,3*(1-prog)+1);
      const alpha=0.28+prog*0.10;
      ctx.fillStyle=`rgba(28,24,18,${alpha})`;
      ctx.fillRect(cx-tieW/2,ty-tieH/2,tieW,tieH);
      /* Grain bois */
      ctx.strokeStyle=`rgba(40,34,24,${alpha*0.5})`;ctx.lineWidth=0.4;
      ctx.beginPath();ctx.moveTo(cx-tieW/2,ty);ctx.lineTo(cx+tieW/2,ty);ctx.stroke();
     }

     /* Rails — 2 lignes métalliques avec reflet */
     for(const side of [-1,1]){
      const xBot=cx+side*railSpreadBot;
      const xVp=railVpX+side*railSpreadVp;
      /* Ombre */
      ctx.strokeStyle='rgba(4,3,2,0.60)';ctx.lineWidth=3.5;ctx.lineCap='round';
      ctx.beginPath();ctx.moveTo(xBot+1,H);ctx.lineTo(xVp+1,railVpY);ctx.stroke();
      /* Rail principal */
      const railGrd=ctx.createLinearGradient(0,railVpY,0,H);
      railGrd.addColorStop(0,'rgba(55,50,42,0.55)');
      railGrd.addColorStop(0.3,'rgba(88,80,65,0.80)');
      railGrd.addColorStop(0.65,'rgba(100,92,75,0.90)');
      railGrd.addColorStop(1,'rgba(80,72,58,0.85)');
      ctx.strokeStyle=railGrd;ctx.lineWidth=3;
      ctx.beginPath();ctx.moveTo(xBot,H);ctx.lineTo(xVp,railVpY);ctx.stroke();
      /* Reflet nacré sur le dessus du rail */
      const shimGrd=ctx.createLinearGradient(0,railVpY,0,H);
      shimGrd.addColorStop(0,'rgba(130,120,95,0.30)');
      shimGrd.addColorStop(0.5,'rgba(160,148,115,0.45)');
      shimGrd.addColorStop(1,'rgba(140,128,100,0.35)');
      ctx.strokeStyle=shimGrd;ctx.lineWidth=1.0;
      ctx.beginPath();ctx.moveTo(xBot,H);ctx.lineTo(xVp,railVpY);ctx.stroke();
     }

     /* Lueur sur les rails depuis les lampadaires */
     for(const lp of lampPosts){
      const rlx=cx+(lp.side<0?-1:1)*railSpreadBot*0.5;
      const rlyTop=H*0.72+H*0.08, rlyBot=H;
      const rlGrd=ctx.createLinearGradient(0,rlyTop,0,rlyBot);
      rlGrd.addColorStop(0,`rgba(160,140,75,${0.06+Math.sin(flickerPhase*0.7+lp.side)*0.015})`);
      rlGrd.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=rlGrd;
      ctx.fillRect(cx-railSpreadBot*1.6,rlyTop,railSpreadBot*3.2,rlyBot-rlyTop);
     }

     /* Fenêtres allumées — jaune très pâle */
     ctx.fillStyle='rgba(180,160,100,0.08)';
     const winData=[[0.04,0.28],[0.08,0.36],[0.14,0.24],[0.16,0.32],[0.74,0.22],[0.78,0.30],[0.82,0.18],[0.86,0.26],[0.90,0.32]];
     for(const [wx,wy] of winData){
      ctx.fillRect(wx*W,wy*H,W*0.028,H*0.018);
      /* Halo */
      const wg=ctx.createRadialGradient(wx*W+W*0.014,wy*H+H*0.009,0,wx*W+W*0.014,wy*H+H*0.009,W*0.04);
      wg.addColorStop(0,'rgba(160,140,80,0.06)');wg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=wg;ctx.fillRect(wx*W-W*0.02,wy*H-H*0.01,W*0.07,H*0.04);
      ctx.fillStyle='rgba(180,160,100,0.08)';
     }

     /* Neige/brume au sol */
     const fogG=ctx.createLinearGradient(0,H*0.82,0,H);
     fogG.addColorStop(0,'rgba(18,18,18,0)');
     fogG.addColorStop(1,'rgba(18,18,18,0.55)');
     ctx.fillStyle=fogG;ctx.fillRect(0,H*0.82,W,H*0.18);
    }

    function drawCandle(){
     const flick=Math.sin(flickerPhase)*0.5+Math.sin(flickerPhase*2.1)*0.30;
     const fScale=1+flick*0.07;
     const fX=candleX+flick*1.5;

     /* Halo au sol étendu */
     const halo=ctx.createRadialGradient(candleX,candleBaseY,0,candleX,candleBaseY,W*0.35);
     halo.addColorStop(0,`rgba(200,130,30,${0.12+Math.abs(flick)*0.04})`);
     halo.addColorStop(0.4,'rgba(180,100,20,0.04)');
     halo.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=halo;ctx.fillRect(0,H*0.70,W,H*0.30);

     /* Corps bougie */
     ctx.fillStyle='#1e1e1e';
     ctx.beginPath();ctx.roundRect(candleX-candleW/2,candleBaseY-candleH,candleW,candleH,2);ctx.fill();
     /* Reflet latéral */
     ctx.fillStyle='rgba(255,255,255,0.04)';
     ctx.beginPath();ctx.roundRect(candleX-candleW/2,candleBaseY-candleH,candleW*0.30,candleH,2);ctx.fill();

     /* Cire fondue */
     ctx.fillStyle='#252525';
     ctx.beginPath();ctx.ellipse(candleX,candleBaseY-candleH,candleW/2+1.5,3.5,0,0,Math.PI*2);ctx.fill();

     /* Mèche */
     ctx.strokeStyle='#666';ctx.lineWidth=1.0;ctx.lineCap='round';
     ctx.beginPath();ctx.moveTo(candleX,candleBaseY-candleH);
     ctx.lineTo(candleX+flick*0.4,candleBaseY-candleH-W*0.016);ctx.stroke();

     /* Flamme */
     ctx.save();ctx.translate(fX,candleBaseY-candleH-W*0.016);ctx.scale(fScale,fScale);
     const fg1=ctx.createRadialGradient(0,0,0,0,0,W*0.030);
     fg1.addColorStop(0,'rgba(255,240,160,0.95)');
     fg1.addColorStop(0.45,'rgba(255,150,40,0.65)');
     fg1.addColorStop(1,'rgba(200,60,0,0)');
     ctx.fillStyle=fg1;
     ctx.beginPath();ctx.ellipse(0,-W*0.014,W*0.016,W*0.028,0,0,Math.PI*2);ctx.fill();
     /* Cœur blanc */
     const fg2=ctx.createRadialGradient(0,-W*0.008,0,0,-W*0.008,W*0.012);
     fg2.addColorStop(0,'rgba(255,255,230,1)');
     fg2.addColorStop(0.4,'rgba(255,210,100,0.90)');
     fg2.addColorStop(1,'rgba(255,120,20,0)');
     ctx.fillStyle=fg2;
     ctx.beginPath();ctx.ellipse(0,-W*0.012,W*0.007,W*0.015,0,0,Math.PI*2);ctx.fill();
     ctx.restore();

     /* Halo global de la bougie sur toute la scène */
     const glow=ctx.createRadialGradient(candleX,candleBaseY-candleH,0,candleX,candleBaseY-candleH,W*0.70);
     glow.addColorStop(0,`rgba(220,160,60,${0.07+Math.abs(flick)*0.02})`);
     glow.addColorStop(0.35,'rgba(180,110,30,0.025)');
     glow.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=glow;ctx.fillRect(0,0,W,H);
    }

    function frame(){
     if(stop.v)return;

     drawStreet();

     /* Fondu d'accumulation léger */
     ctx.fillStyle='rgba(6,6,6,0.12)';ctx.fillRect(0,0,W,H);

     /* Halo sépia très léger au centre */
     const sg=ctx.createRadialGradient(cx,H*0.55,0,cx,H*0.55,W*0.65);
     sg.addColorStop(0,'rgba(55,38,8,0.05)');sg.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=sg;ctx.fillRect(0,0,W,H);

     flickerPhase+=0.06+Math.random()*0.04;

     /* Fumée de la bougie */
     for(const p of smokeP){
      p.x+=p.vx;p.y+=p.vy;p.ph+=0.015;p.r+=0.04;p.op-=0.0003;
      if(p.op<0.005||p.y<H*0.35){
       p.x=candleX+(Math.random()-0.5)*W*0.018;
       p.y=candleBaseY-candleH-H*0.04;
       p.r=W*0.014;p.op=0.055;
      }
      const sg2=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r);
      sg2.addColorStop(0,`rgba(28,28,28,${p.op})`);sg2.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=sg2;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();
     }

     /* Halo de la bougie sur le manteau — dessiné sur le canvas */
     const mHalo=ctx.createRadialGradient(candleX,candleBaseY-candleH,0,candleX+W*0.22,candleBaseY-H*0.15,W*0.55);
     mHalo.addColorStop(0,`rgba(220,150,50,${0.16+Math.abs(Math.sin(flickerPhase))*0.06})`);
     mHalo.addColorStop(0.3,`rgba(180,110,30,${0.06+Math.abs(Math.sin(flickerPhase))*0.03})`);
     mHalo.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=mHalo;ctx.fillRect(0,H*0.40,W,H*0.60);

     /* Lueur rasante sur le sol devant les rails */
     const floorLit=ctx.createLinearGradient(0,H*0.75,0,H);
     floorLit.addColorStop(0,`rgba(180,140,55,${0.04+Math.abs(Math.sin(flickerPhase*0.5))*0.02})`);
     floorLit.addColorStop(1,'rgba(0,0,0,0)');
     ctx.fillStyle=floorLit;ctx.fillRect(cx-W*0.15,H*0.75,W*0.30,H*0.25);

     drawCandle();

     /* Cendres */
     for(const a of ashes){
      a.wobble+=a.wobSpd;
      a.x+=a.vx+Math.sin(a.wobble)*0.28;
      a.y+=a.vy;a.rot+=a.rotSpd;
      if(a.y>H+a.rx){a.y=-a.rx;a.x=Math.random()*W;}
      ctx.save();ctx.translate(a.x,a.y);ctx.rotate(a.rot);
      if(a.isEmber){
       ctx.fillStyle=`rgba(215,120,35,${a.op*0.75})`;
      } else {
       const gv=140+Math.floor(Math.random()*80);
       ctx.fillStyle=`rgba(${gv},${gv},${gv},${a.op})`;
      }
      ctx.beginPath();ctx.ellipse(0,0,a.rx,a.ry,0,0,Math.PI*2);ctx.fill();
      ctx.restore();
     }

     /* Vignette */
     const vg=ctx.createRadialGradient(cx,H*0.55,H*0.08,cx,H*0.55,H*0.88);
     vg.addColorStop(0,'rgba(0,0,0,0)');
     vg.addColorStop(0.42,'rgba(0,0,0,0.18)');
     vg.addColorStop(1,'rgba(0,0,0,0.90)');
     ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);

     /* Grain pellicule argentique */
     for(let gi=0;gi<50;gi++){
      const gv2=8+Math.random()*20|0;
      ctx.fillStyle=`rgba(${gv2},${gv2},${gv2},${Math.random()*0.025})`;
      ctx.fillRect(Math.random()*W,Math.random()*H,Math.random()*1.4+0.2,1);
     }

     t+=0.016;requestAnimationFrame(frame);
    }
    frame();
   }
  };
})();
