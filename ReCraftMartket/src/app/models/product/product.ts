import { FileDataProduct } from "../files/file-data-product";
import { UserEntity } from "../user/user_entity";

export class Product {
    idProduct!: number;
    title!: string;
    price !: string;
    description!: string;
    category!:string;
    targetDate!:Date;
    shopPoints!: number;
    points!:number;
    sold!:boolean;
    materials!:string;
    status!:string;
    publisher!:UserEntity;
    filesProduct!:FileDataProduct[];

/**"
        
         private long idProduct;
    private String title;
    private String description;
    private String price;
    private String category;
    private Date targetDate;
    // once you click on shop now button
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Long shopPoints = 0L;
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    //totalPoints = likesPoints + wishListPoints + shopPoints + commentsPoints
    private Long points = 0L;
    //private boolean isDone; // the product is sold or not
    private boolean sold;
    private String materials;
    private String Status;
    // @ElementCollection(fetch = FetchType.LAZY)
 */
}

